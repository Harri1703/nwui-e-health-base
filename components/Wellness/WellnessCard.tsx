import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Card, CardContent } from "~/components/nativewindui/Card";
import { Text } from "~/components/nativewindui/Text";

type WellnessCardProps = {
  score: number;                // Wellness score (e.g. 84)
  steps: string;                // Steps value (e.g. "8,439")
  sleep: string;                // Sleep value (e.g. "7.5h")
  heartRate: string;            // Heart rate value (e.g. "72 bpm")
};

export function WellnessCard({
  score,
  steps,
  sleep,
  heartRate,
}: WellnessCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        {/* Top row: Wellness Score */}
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text variant="title3" className="font-semibold">
              Today's Wellness Score
            </Text>
            <Text variant="body" className="text-muted-foreground">
              You're doing great!
            </Text>
          </View>

          {/* Circle with score */}
          <View className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center">
            <Text variant="title2" className="text-white font-bold">
              {score}
            </Text>
          </View>
        </View>

        {/* Bottom row: Steps, Sleep, Heart Rate */}
        <View className="flex-row justify-between mt-2">
          {/* Steps */}
          <View className="flex-1 items-center">
            <Ionicons name="walk-outline" size={22} color="#2563eb" />
            <Text variant="subhead" className="text-muted-foreground mt-1">
              Steps
            </Text>
            <Text variant="body" className="font-semibold">{steps}</Text>
          </View>

          {/* Sleep */}
          <View className="flex-1 items-center">
            <Ionicons name="bed-outline" size={22} color="#2563eb" />
            <Text variant="subhead" className="text-muted-foreground mt-1">
              Sleep
            </Text>
            <Text variant="body" className="font-semibold">{sleep}</Text>
          </View>

          {/* Heart Rate */}
          <View className="flex-1 items-center">
            <Ionicons name="heart-outline" size={22} color="#2563eb" />
            <Text variant="subhead" className="text-muted-foreground mt-1">
              Heart Rate
            </Text>
            <Text variant="body" className="font-semibold">{heartRate}</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
