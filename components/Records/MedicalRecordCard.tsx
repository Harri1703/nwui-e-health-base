import React from 'react';
import { View, Pressable, useColorScheme } from 'react-native';
import { Card, CardContent } from '../nativewindui/Card';
import { Text } from '../nativewindui/Text';
import { Ionicons } from '@expo/vector-icons';

type RecordType = 'Prescription' | 'Lab Report' | 'Scan' | 'Discharge';

type MedicalRecordCardProps = {
  type: RecordType;
  title: string;
  doctor: string;
  hospital: string;
  date: string;
  onView?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
};

const typeConfig: Record<
  RecordType,
  { color: string; icon: keyof typeof Ionicons.glyphMap; bg: string; chipBg: string }
> = {
  Prescription: {
    color: '#3B82F6',
    icon: 'medkit-outline',
    bg: 'bg-blue-100 dark:bg-blue-950/40',
    chipBg: 'bg-blue-600',
  },
  'Lab Report': {
    color: '#22C55E',
    icon: 'flask-outline',
    bg: 'bg-green-100 dark:bg-green-950/40',
    chipBg: 'bg-green-600',
  },
  Scan: {
    color: '#A855F7',
    icon: 'images-outline',
    bg: 'bg-purple-100 dark:bg-purple-950/40',
    chipBg: 'bg-purple-600',
  },
  Discharge: {
    color: '#F97316',
    icon: 'business-outline',
    bg: 'bg-orange-100 dark:bg-orange-950/40',
    chipBg: 'bg-orange-600',
  },
};

export function MedicalRecordCard({
  type,
  title,
  doctor,
  hospital,
  date,
  onView,
  onDownload,
  onShare,
}: MedicalRecordCardProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  // Neutral icon colors for meta/actions (good contrast in both modes)
  const metaIconColor = isDark ? '#9CA3AF' : '#6B7280'; // gray-400 / gray-500
  const actionIconColor = isDark ? '#E5E7EB' : '#374151'; // gray-200 / gray-700

  const config = typeConfig[type];

  return (
    <Card className="rounded-xl">
      <CardContent className="p-4">
        {/* Header */}
        <View className="flex-row items-center space-x-3 mb-2">
          <View className={`w-10 h-10 rounded-lg items-center justify-center ${config.bg}`}>
            <Ionicons name={config.icon} size={20} color={config.color} />
          </View>
          <View className="flex-row items-center justify-between flex-1 ml-2">
            <Text variant="body" className="font-semibold">
              {title}
            </Text>
            <Text
              className={`px-4 py-2 rounded-full text-sm font-medium text-white ${config.chipBg}`}
            >
              {type}
            </Text>
          </View>
        </View>

        {/* Doctor and Hospital */}
        <Text variant="body" className="text-muted-foreground">
          {doctor}
        </Text>
        <Text variant="body" className="text-muted-foreground mb-3">
          {hospital}
        </Text>

        {/* Date + Actions */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color={metaIconColor} />
            <Text variant="body" className="text-muted-foreground ml-2">
              {date}
            </Text>
          </View>

          <View className="flex-row">
            <Pressable onPress={onView} hitSlop={10}>
              <Ionicons style={{ marginRight: 12 }} name="eye-outline" size={22} color={actionIconColor} />
            </Pressable>
            <Pressable onPress={onDownload} hitSlop={10}>
              <Ionicons style={{ marginRight: 12 }} name="download-outline" size={22} color={actionIconColor} />
            </Pressable>
            <Pressable onPress={onShare} hitSlop={10}>
              <Ionicons style={{ marginRight: 4 }} name="share-social-outline" size={22} color={actionIconColor} />
            </Pressable>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
