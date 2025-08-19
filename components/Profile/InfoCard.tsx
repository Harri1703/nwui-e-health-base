import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '../nativewindui/Card';
import { Text } from '../nativewindui/Text';

type InfoCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;              // Top left
  subtitle?: string;          // Below title
  bottomLeft?: string;        // Bottom left label
  bottomRight?: string;       // Bottom right value
  bottomRightColor?: string;  // Color for bottom right
  showArrow?: boolean;
  iconColor?: string;
  onPress?: () => void;
};

export function InfoCard({
  icon,
  title,
  subtitle,
  bottomLeft,
  bottomRight,
  bottomRightColor = "#000",
  showArrow = false,
  iconColor,
  onPress,
}: InfoCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="w-full mb-4"
    >
      <Card>
        <CardContent className="px-4 py-3">
          {/* Top row: icon + title + optional arrow */}
          <View className="flex-row justify-between items-start">
            <View className="flex-row items-center">
              <Ionicons
                name={icon}
                size={22}
                color={iconColor || "#2563eb"}
                style={{ marginRight: 10 }}
              />
              <View>
                <Text variant="body" className="font-medium">
                  {title}
                </Text>
                {subtitle && (
                  <Text variant="body" className="text-muted-foreground">
                    {subtitle}
                  </Text>
                )}
              </View>
            </View>

            {showArrow && (
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9ca3af"
              />
            )}
          </View>

          {/* Bottom row: left + right */}
          {(bottomLeft || bottomRight) && (
            <View className="flex-row justify-between items-center mt-3">
              <Text variant="body" className="text-muted-foreground">
                {bottomLeft}
              </Text>
              {bottomRight && (
                <Text variant="body" style={{ color: bottomRightColor }}>
                  {bottomRight}
                </Text>
              )}
            </View>
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
