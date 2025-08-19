// components/Wellness/TipCard.tsx
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "~/components/nativewindui/Card";
import { Text } from "~/components/nativewindui/Text";

type TipCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onPress?: () => void;
  width?: number;           
  minHeight?: number;       
  spacing?: number;         
  maxSubtitleLines?: number;
};

export function TipCard({
  icon,
  iconColor = "#16a34a",
  title,
  subtitle,
  ctaText = "Read More",
  onPress,
  width = 260,
  minHeight = 160,
  spacing = 12,
  maxSubtitleLines = 2,
}: TipCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{ width, minHeight, flexShrink: 0, marginRight: spacing }}
    >
      <Card className="rounded-2xl">
        <CardContent className="p-4" style={{ minHeight }}>
          <View style={{ flexDirection: "column", height: "100%" }}>
            <View>
              <Ionicons name={icon} size={24} color={iconColor} />
              <Text variant="title3" className="font-semibold mt-2" numberOfLines={1}>
                {title}
              </Text>
              {subtitle ? (
                <Text
                  variant="body"
                  className="text-muted-foreground mt-1"
                  numberOfLines={maxSubtitleLines}
                  ellipsizeMode="tail"
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>

            <Text
              variant="body"
              className="text-blue-600 font-medium"
              style={{ marginTop: "auto" }}
            >
              {ctaText}
            </Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
