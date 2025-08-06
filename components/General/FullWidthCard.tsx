import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '../nativewindui/Card';
import { Text } from '../nativewindui/Text';
import clsx from 'clsx'; // Tailwind-style conditional classnames

type FullWidthCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  showArrow?: boolean;
  iconColor?: string;
  onPress?: () => void;
};

export function FullWidthCard({
  icon,
  title,
  subtitle,
  showArrow = false,
  iconColor,
  onPress,
}: FullWidthCardProps) {
  const hasSubtitle = !!subtitle;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="w-full mb-4"
    >
      <Card>
        <CardContent className="flex-row items-center px-4 py-3 space-x-3">
          {/* Icon */}
          <Ionicons name={icon} size={24} color={iconColor || "#2563eb"} className='mr-4' />

          {/* Title and subtitle */}
          <View
            className={clsx(
              'flex-1',
              !hasSubtitle
            )}
          >
            <Text variant="body">{title}</Text>
            {hasSubtitle && (
              <Text variant="body" className="text-muted-foreground">
                {subtitle}
              </Text>
            )}
          </View>

          {/* Optional arrow */}
          {showArrow && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#9ca3af"
              className="ml-2"
            />
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
