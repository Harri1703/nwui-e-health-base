import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  Alert,
  Linking,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { MedicalRecordCard } from '~/components/Records/MedicalRecordCard';

type RecordType = 'Prescription' | 'Lab Report' | 'Scan' | 'Discharge';
type StoredRecord = {
  id: string;
  type: RecordType;
  title: string;
  doctor: string;
  hospital: string;
  date: string; // stored as toLocaleDateString()
  fileUri: string;
  fileName: string;
  mimeType?: string | null;
};

const STORAGE_KEY = '@medical_records_v1';
const RECORDS_DIR = FileSystem.documentDirectory + 'records/';
const ANDROID_DIR_KEY = '@records_android_saf_dir';

const categories: Array<'All Records' | RecordType> = [
  'All Records',
  'Prescription',
  'Lab Report',
  'Scan',
  'Discharge',
];

export default function MedicalRecordsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selected, setSelected] = useState<'All Records' | RecordType>('All Records');
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<StoredRecord[]>([]);
  const [preview, setPreview] = useState<{ visible: boolean; uri?: string; title?: string }>({
    visible: false,
  });
  const [pdfPreview, setPdfPreview] = useState<{ visible: boolean; uri?: string; title?: string }>(
    { visible: false }
  );

  const [form, setForm] = useState<{
    type: RecordType;
    documentName: string;
    doctor: string;
    hospital: string;
    file: { uri: string; name: string; mimeType?: string | null } | null;
  }>({
    type: 'Prescription',
    documentName: '',
    doctor: '',
    hospital: '',
    file: null,
  });

  // ---------- Helpers: storage ----------
  async function ensureRecordsDir() {
    const info = await FileSystem.getInfoAsync(RECORDS_DIR);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(RECORDS_DIR, { intermediates: true });
    }
  }

  async function loadRecords() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setRecords(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load records', e);
    }
  }

  async function saveRecords(next: StoredRecord[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save records', e);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  // ---------- Add / Pickers ----------
  async function handleTakePhoto() {
    try {
      const camPerm = await ImagePicker.requestCameraPermissionsAsync();
      if (!camPerm.granted) {
        Alert.alert('Permission required', 'Camera permission is needed to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;
      const asset = result.assets[0];
      if (!asset?.uri) return;

      await ensureRecordsDir();
      const fileName = `photo_${Date.now()}.jpg`;
      const dest = RECORDS_DIR + fileName;

      await FileSystem.copyAsync({ from: asset.uri, to: dest });
      setForm({
        ...form,
        file: { uri: dest, name: fileName, mimeType: 'image/jpeg' },
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Failed to capture and save the photo.');
    }
  }

  async function handleUploadFile() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });
      if (res.canceled) return;

      const file = res.assets[0];
      if (!file?.uri || !file.name) return;

      await ensureRecordsDir();
      const safeName = `${Date.now()}_${file.name.replace(/[^\w.\-]+/g, '_')}`;
      const dest = RECORDS_DIR + safeName;

      await FileSystem.copyAsync({ from: file.uri, to: dest });

      setForm({
        ...form,
        file: { uri: dest, name: safeName, mimeType: file.mimeType ?? null },
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Failed to pick and save the file.');
    }
  }

  function handleAddRecord() {
    if (!form.file?.uri) {
      Alert.alert('Missing file', 'Please attach a photo or file before adding.');
      return;
    }

    const newRecord: StoredRecord = {
      id: String(Date.now()),
      type: form.type,
      title: form.documentName || 'Untitled Record',
      doctor: form.doctor || '—',
      hospital: form.hospital || '—',
      date: new Date().toLocaleDateString(), // display date
      fileUri: form.file.uri,
      fileName: form.file.name,
      mimeType: form.file.mimeType ?? null,
    };

    const next = [newRecord, ...records];
    setRecords(next);

    setForm({
      type: 'Prescription',
      documentName: '',
      doctor: '',
      hospital: '',
      file: null,
    });
    setShowModal(false);
  }

  // ---------- Helpers ----------
  function isImage(mime?: string | null, name?: string) {
    if (mime?.startsWith('image/')) return true;
    const lower = (name ?? '').toLowerCase();
    return (
      lower.endsWith('.jpg') ||
      lower.endsWith('.jpeg') ||
      lower.endsWith('.png') ||
      lower.endsWith('.webp') ||
      lower.endsWith('.heic')
    );
  }
  function isPdf(mime?: string | null, name?: string) {
    if (mime === 'application/pdf') return true;
    return (name ?? '').toLowerCase().endsWith('.pdf');
  }

  // ---------- Actions: View ----------
  async function handleView(rec: StoredRecord) {
    try {
      // Images → in-app modal
      if (isImage(rec.mimeType, rec.fileName)) {
        setPreview({ visible: true, uri: rec.fileUri, title: rec.title });
        return;
      }

      // PDFs
      if (isPdf(rec.mimeType, rec.fileName)) {
        if (Platform.OS === 'android') {
          const contentUri = await FileSystem.getContentUriAsync(rec.fileUri);
          try {
            await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
              data: contentUri,
              type: 'application/pdf',
              flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
            });
            return;
          } catch {
            Alert.alert(
              'PDF viewer required',
              'No app found to open PDFs. Install a PDF viewer from Play Store?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Install',
                  onPress: () => {
                    const playStore = 'market://details?id=com.adobe.reader';
                    const web = 'https://play.google.com/store/apps/details?id=com.adobe.reader';
                    Linking.openURL(playStore).catch(() => Linking.openURL(web));
                  },
                },
              ]
            );
            return;
          }
        } else {
          setPdfPreview({ visible: true, uri: rec.fileUri, title: rec.title });
          return;
        }
      }

      // Other types
      if (Platform.OS === 'android') {
        const contentUri = await FileSystem.getContentUriAsync(rec.fileUri);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          type: rec.mimeType ?? 'application/octet-stream',
          flags: 1,
        });
        return;
      } else {
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert('Not supported', 'Opening this file is not available on this device.');
          return;
        }
        await Sharing.shareAsync(rec.fileUri, {
          UTI: rec.mimeType ?? undefined,
          mimeType: rec.mimeType ?? undefined,
        });
      }
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Unable to open this file.');
    }
  }

  // ---------- Actions: Share (always share sheet) ----------
  async function handleShare(rec: StoredRecord) {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Not supported', 'Sharing is not available on this device.');
        return;
      }
      await Sharing.shareAsync(rec.fileUri, {
        UTI: rec.mimeType ?? undefined,
        mimeType: rec.mimeType ?? undefined,
        dialogTitle: `Share: ${rec.fileName}`,
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Unable to share this file.');
    }
  }

  // ---------- Actions: Download (save to device) ----------
  async function getAndroidTargetDir(): Promise<string | null> {
    let dir = await AsyncStorage.getItem(ANDROID_DIR_KEY);
    if (dir) return dir;

    const perm = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (perm.granted && perm.directoryUri) {
      await AsyncStorage.setItem(ANDROID_DIR_KEY, perm.directoryUri);
      return perm.directoryUri;
    }
    return null;
  }

  async function handleDownload(rec: StoredRecord) {
    try {
      if (Platform.OS === 'android') {
        const dirUri = await getAndroidTargetDir();
        if (!dirUri) {
          Alert.alert(
            'Permission needed',
            'Please choose a folder to save downloads. Try again after granting permission.'
          );
          return;
        }
        const mime = rec.mimeType ?? 'application/octet-stream';
        let targetName = rec.fileName;
        try {
          const destUri = await FileSystem.StorageAccessFramework.createFileAsync(
            dirUri,
            targetName,
            mime
          );
          const b64 = await FileSystem.readAsStringAsync(rec.fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.writeAsStringAsync(destUri, b64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          Alert.alert('Saved', `Saved to selected folder as:\n${targetName}`);
          return;
        } catch {
          targetName = `${Date.now()}_${rec.fileName}`;
          const destUri = await FileSystem.StorageAccessFramework.createFileAsync(
            dirUri,
            targetName,
            mime
          );
          const b64 = await FileSystem.readAsStringAsync(rec.fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await FileSystem.writeAsStringAsync(destUri, b64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          Alert.alert('Saved', `Saved to selected folder as:\n${targetName}`);
          return;
        }
      } else if (Platform.OS === 'ios') {
        if (isImage(rec.mimeType, rec.fileName)) {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission required', 'Photos permission is needed to save images.');
            return;
          }
          await MediaLibrary.saveToLibraryAsync(rec.fileUri);
          Alert.alert('Saved to Photos', `${rec.fileName} has been saved to your Photos.`);
          return;
        }
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert('Not supported', 'Saving is not available on this device.');
          return;
        }
        await Sharing.shareAsync(rec.fileUri, {
          UTI: rec.mimeType ?? undefined,
          mimeType: rec.mimeType ?? undefined,
          dialogTitle: `Save: ${rec.fileName}`,
        });
      } else {
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert('Not supported', 'Saving is not available on this platform.');
          return;
        }
        await Sharing.shareAsync(rec.fileUri, {
          UTI: rec.mimeType ?? undefined,
          mimeType: rec.mimeType ?? undefined,
          dialogTitle: `Save: ${rec.fileName}`,
        });
      }
    } catch (e: any) {
      console.warn(e);
      Alert.alert('Error', e?.message ?? 'Unable to save this file.');
    }
  }

  // ---------- Filtering & Grouping ----------
  const filtered = useMemo(
    () => records.filter((r) => selected === 'All Records' || r.type === selected),
    [records, selected]
  );

  // Robust-ish date parse for our display-stored dates
  function parseDateSafe(dateStr: string) {
    // Try native
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
    // Fallback for dd/mm/yyyy or mm/dd/yyyy
    const parts = dateStr.split(/[\/\-\.]/).map((x) => parseInt(x, 10));
    if (parts.length === 3) {
      const [a, b, c] = parts;
      // Guess mm/dd/yyyy first, then dd/mm/yyyy
      let guess = new Date(c, a - 1, b);
      if (isNaN(guess.getTime())) guess = new Date(c, b - 1, a);
      if (!isNaN(guess.getTime())) return guess;
    }
    return new Date(); // fallback to now
  }

  function monthKey(d: Date) {
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const groupedByMonth = useMemo(() => {
    const bucket: Record<string, { ts: number; items: StoredRecord[] }> = {};
    for (const rec of filtered) {
      const d = parseDateSafe(rec.date);
      const key = monthKey(d);
      if (!bucket[key]) {
        // ts = first day of that month for sorting
        const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
        bucket[key] = { ts: monthStart, items: [] };
      }
      bucket[key].items.push(rec);
    }
    // Sort each month's items by date desc (optional)
    for (const k of Object.keys(bucket)) {
      bucket[k].items.sort(
        (a, b) => parseDateSafe(b.date).getTime() - parseDateSafe(a.date).getTime()
      );
    }
    // Return entries sorted by month desc (Aug above July, etc.)
    return Object.entries(bucket).sort(([, A], [, B]) => B.ts - A.ts);
  }, [filtered]);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-950">
      <ScrollView
        className="px-4"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 100,
        }}
      >
        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-4">
          <View className="flex-row px-1">
            {categories.map((category, idx) => {
              const categoryColors: Record<string, string> = {
                'All Records': 'bg-yellow-400',
                Prescription: 'bg-blue-600',
                'Lab Report': 'bg-green-600',
                Scan: 'bg-purple-600',
                Discharge: 'bg-orange-600',
              };
              const isSelected = selected === category;
              const bgColor = isSelected
                ? categoryColors[category] || 'bg-blue-600'
                : 'bg-gray-100 dark:bg-neutral-800';
              const textColor = isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300';

              return (
                <Text
                  key={category}
                  onPress={() => setSelected(category as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${bgColor} ${textColor} ${idx !== 0 ? 'ml-3' : ''}`}
                >
                  {category}
                </Text>
              );
            })}
          </View>
        </ScrollView>

        {/* Records grouped by month */}
        {groupedByMonth.map(([month, recs]) => (
          <View key={month} className="mb-8">
            <Text className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {month}
            </Text>

            {recs.items.map((record) => (
              <View className="mb-4" key={record.id}>
                <MedicalRecordCard
                  type={record.type}
                  title={record.title}
                  doctor={record.doctor}
                  hospital={record.hospital}
                  date={record.date}
                  onView={() => handleView(record)}
                  onDownload={() => handleDownload(record)}
                  onShare={() => handleShare(record)}
                />
              </View>
            ))}
          </View>
        ))}

        {filtered.length === 0 && (
          <View className="items-center justify-center py-16">
            <Ionicons name="document-outline" size={36} color={isDark ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-muted-foreground mt-2">No records yet</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating + Button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg z-50"
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Add Record Modal (DARK MODE FIXES) */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        {/* Dim overlay */}
        <Pressable
          style={{ flex: 1, backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowModal(false)}
        >
          {/* Bottom sheet */}
          <Pressable
            style={{ padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            className="bg-white dark:bg-neutral-900"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-lg font-semibold mb-2">Add Record</Text>

            {/* Category pills */}
            <ScrollView horizontal className="mb-4" showsHorizontalScrollIndicator={false}>
              {categories.slice(1).map((type) => {
                const selectedType = form.type === (type as RecordType);
                const bg = selectedType
                  ? ({
                      Prescription: 'bg-blue-600',
                      'Lab Report': 'bg-green-600',
                      Scan: 'bg-purple-600',
                      Discharge: 'bg-orange-600',
                    } as any)[type] || 'bg-blue-600'
                  : 'bg-gray-100 dark:bg-neutral-800';
                const text = selectedType ? 'text-white' : 'text-gray-800 dark:text-gray-300';

                return (
                  <TouchableOpacity
                    key={type}
                    className={`px-3 py-1 mr-2 rounded-full border border-transparent ${bg}`}
                    onPress={() => setForm({ ...form, type: type as RecordType })}
                  >
                    <Text className={text}>{type}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Inputs (dark backgrounds, visible placeholders, borders) */}
            <TextInput
              placeholder="Document Name"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className="rounded mb-3 px-3 py-2 border text-base dark:text-white
                         bg-white dark:bg-neutral-800
                         border-gray-300 dark:border-neutral-700"
              value={form.documentName}
              onChangeText={(t) => setForm({ ...form, documentName: t })}
            />
            <TextInput
              placeholder="Doctor Name"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className="rounded mb-3 px-3 py-2 border text-base dark:text-white
                         bg-white dark:bg-neutral-800
                         border-gray-300 dark:border-neutral-700"
              value={form.doctor}
              onChangeText={(t) => setForm({ ...form, doctor: t })}
            />
            <TextInput
              placeholder="Hospital"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className="rounded mb-4 px-3 py-2 border text-base dark:text-white
                         bg-white dark:bg-neutral-800
                         border-gray-300 dark:border-neutral-700"
              value={form.hospital}
              onChangeText={(t) => setForm({ ...form, hospital: t })}
            />

            {/* Upload Buttons */}
            <View className="flex-row justify-between mb-4">
              <Button variant="tonal" onPress={handleTakePhoto}>
                <Text>Take Photo</Text>
              </Button>
              <Button variant="tonal" onPress={handleUploadFile}>
                <Text>Upload File</Text>
              </Button>
            </View>

            {/* File Preview */}
            {form.file && (
              <Text className="mb-3 text-blue-600 dark:text-blue-400">
                Attached: {form.file.name}
              </Text>
            )}

            <Button onPress={handleAddRecord}>
              <Text>Add Record</Text>
            </Button>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={preview.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setPreview({ visible: false })}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setPreview({ visible: false })}
        >
          <View className="w-11/12 h-5/6 bg-black rounded-2xl overflow-hidden">
            {preview.uri ? (
              <Image
                source={{ uri: preview.uri }}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            ) : null}
          </View>
          <Text className="text-white mt-3">{preview.title}</Text>
        </Pressable>
      </Modal>

      {/* PDF Preview Modal (iOS) */}
      <Modal
        visible={pdfPreview.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setPdfPreview({ visible: false })}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setPdfPreview({ visible: false })}
        >
          <View className="w-11/12 h-5/6 bg-black rounded-2xl overflow-hidden">
            {pdfPreview.uri ? (
              <WebView
                source={{ uri: pdfPreview.uri }}
                originWhitelist={['*']}
                javaScriptEnabled
                allowFileAccess
                allowFileAccessFromFileURLs
                allowsBackForwardNavigationGestures
                mixedContentMode="always"
                style={{ flex: 1 }}
              />
            ) : null}
          </View>
          <Text className="text-white mt-3">{pdfPreview.title}</Text>
        </Pressable>
      </Modal>
    </View>
  );
}
