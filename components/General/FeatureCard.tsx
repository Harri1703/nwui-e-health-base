import { Text } from '../nativewindui/Text';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '../nativewindui/Card';
import { View } from 'react-native';

type FeatureCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  iconColor?: string;
};

export function FeatureCard({ icon, title, subtitle, iconColor }: FeatureCardProps) {
  // Tune these to your design system
  const TITLE_LINE_HEIGHT = 20;     // px
  const SUBTITLE_LINE_HEIGHT = 18;  // px
  const CARD_MIN_HEIGHT = 144;      // shared min-height so all cards align

  return (
    <Card>
      <CardContent className="p-4" style={{ minHeight: CARD_MIN_HEIGHT }}>
        <View className="flex-1 justify-between">
          <View>
            {/* Icon stays fixed and never shifts */}
            <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center">
              <Ionicons name={icon} size={22} color={iconColor || '#2563eb'} />
            </View>

            {/* Title: allow up to 2 lines; reserve space for exactly 2 */}
            <View style={{ marginTop: 8, height: TITLE_LINE_HEIGHT * 2 }}>
              <Text
                variant="body"
                className="font-semibold"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ lineHeight: TITLE_LINE_HEIGHT }}
              >
                {title}
              </Text>
            </View>

            {/* Subtitle: allow up to 2 lines; reserve space for exactly 2 */}
            <View style={{ marginTop: 4, height: SUBTITLE_LINE_HEIGHT * 2 }}>
              <Text
                variant="body"
                className="text-muted-foreground"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ lineHeight: SUBTITLE_LINE_HEIGHT }}
              >
                {subtitle}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
