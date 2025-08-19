import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "~/components/nativewindui/Card";
import { Text } from "~/components/nativewindui/Text";

type ArticleCardProps = {
  image: any;               // require('...') or { uri: '...' }
  title: string;
  subtitle?: string;
  readTime?: string;        // e.g., "5 min read"
  onPress?: () => void;
};

export function ArticleCard({
  image,
  title,
  subtitle,
  readTime,
  onPress,
}: ArticleCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-4"
    >
      <Card className="rounded-2xl">
        <CardContent className="p-3 flex-row items-center">
          {/* Left Image */}
          <Image
            source={image}
            style={{ width: 70, height: 70, borderRadius: 12 }}
            resizeMode="cover"
          />

          {/* Right Content */}
          <View className="flex-1 ml-3">
            <Text
              variant="body"
              className="font-semibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                variant="footnote"
                className="text-muted-foreground mt-1"
                numberOfLines={2}
              >
                {subtitle}
              </Text>
            )}

            {readTime && (
              <View className="flex-row items-center mt-2">
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="#6b7280" // muted gray
                  style={{ marginRight: 4 }}
                />
                <Text variant="footnote" className="text-muted-foreground">
                  {readTime}
                </Text>
              </View>
            )}
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
