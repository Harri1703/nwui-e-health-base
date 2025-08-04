import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

type PickerItem<T> = {
  label: string;
  value: T;
  color?: string;
};

type PickerProps<T> = {
  selectedValue: T;
  onValueChange: (value: T) => void;
  items: PickerItem<T>[];
  label?: string;
  placeholder?: string;
  className?: string;
};

export function Picker<T>({
  selectedValue,
  onValueChange,
  items,
  label,
  placeholder: propPlaceholder = 'Select',
  className,
}: PickerProps<T>) {
  const [visible, setVisible] = useState(false);
  const { colors, isDarkColorScheme } = useColorScheme();

  const selectedItem = items.find((item) => item.value === selectedValue);
  const displayText = selectedItem?.label ?? propPlaceholder;

  return (
    <View className={cn('mb-4', className)}>
      {label && (
        <Text
          className="text-sm font-semibold mb-1"
          style={{ color: colors.foreground }}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="flex-row items-center justify-between rounded-md border px-4 py-3"
        style={{
          backgroundColor: colors.root,
          borderColor: isDarkColorScheme ? '#4B5563' : '#D1D5DB',
        }}
      >
        <Text style={{ color: selectedItem?.color ?? colors.foreground }}>
          {displayText}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.foreground} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          onPress={() => setVisible(false)}
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          activeOpacity={1}
        >
          <View
            className="rounded-t-xl max-h-[50%] px-4"
            style={{ backgroundColor: colors.root }}
          >
            <FlatList
              data={items}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-4 border-b"
                  style={{ borderColor: isDarkColorScheme ? '#374151' : '#E5E7EB' }}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={{ color: item.color ?? colors.foreground }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setVisible(false)} className="py-3">
              <Text
                className="text-center font-medium"
                style={{ color: colors.primary ?? '#3B82F6' }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
