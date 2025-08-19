import { Card, CardContent } from '~/components/nativewindui/Card';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/components/nativewindui/Text';

type VitalsCardProps = {
  bloodType: string;             // e.g., "A+"
  height: string;                // e.g., "165cm"
  weight: string;                // e.g., "62kg"
  lastUpdatedLabel?: string;     // e.g., "Today, 2:30 PM"
  onPressUpdate?: () => void;    // handler for the "Update" link
};

export function VitalsCard({
  bloodType,
  height,
  weight,
  lastUpdatedLabel = '',
  onPressUpdate,
}: VitalsCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        {/* Top row: three metrics */}
        <View className="flex-row justify-between">
          {/* Blood Type */}
          <View className="flex-1">
            <Text variant="subhead" className="text-muted-foreground mb-1">
              Blood Type
            </Text>
            <Text variant="title3" className="font-semibold"> 
              {bloodType}
            </Text>
          </View>

          {/* Height */}
          <View className="flex-1 items-center">
            <Text variant="subhead" className="text-muted-foreground mb-1">
              Height
            </Text>
            <Text variant="title3" className="font-semibold">
              {height}
            </Text>
          </View>

          {/* Weight */}
          <View className="flex-1 items-end">
            <Text variant="subhead" className="text-muted-foreground mb-1">
              Weight
            </Text>
            <Text variant="title3" className="font-semibold">
              {weight}
            </Text>
          </View>
        </View>

        {/* Bottom row: last updated + Update link */}
        <View className="flex-row items-center justify-between mt-3">
          <Text variant="footnote" className="text-muted-foreground">
            {lastUpdatedLabel ? `Last updated: ${lastUpdatedLabel}` : ''}
          </Text>

          <TouchableOpacity onPress={onPressUpdate} disabled={!onPressUpdate}>
            <Text
              variant="body"
              className={`text-blue-600 font-semibold`}
              onPress={onPressUpdate}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </CardContent>
    </Card>
  );
}
