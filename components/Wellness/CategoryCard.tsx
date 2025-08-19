import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContent } from "~/components/nativewindui/Card";
import { Text } from "~/components/nativewindui/Text";

type CategoryCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;   
  title: string;        
  onPress?: () => void;
  size?: number;       
};

export function CategoryCard({
  icon,
  iconColor = "#2563eb",
  title,
  onPress,
  size = 56,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="items-center flex-1"
    >
      <Card className="rounded-2xl w-[110] h-[130] items-center justify-center">
        <CardContent className="items-center justify-center">
          <View
            style={{
              width: size,
              height: size,
              borderRadius: 30,
              backgroundColor: iconColor,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name={icon} size={28} color="white" />
          </View>

          {/* Title */}
          <Text
            variant="body"
            className="font-medium text-center mt-3"
            numberOfLines={2}
          >
            {title}
          </Text>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
