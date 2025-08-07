import { Card, CardContent } from '~/components/nativewindui/Card';
import { Image, View } from 'react-native';
import { Text } from '~/components/nativewindui/Text';

type HealthSnapshotCardProps = {
  heartRate: string;
  bloodPressure: string;
  bloodSugar: string;
};

export function HealthSnapshotCard({
  heartRate,
  bloodPressure,
  bloodSugar,
}: HealthSnapshotCardProps) {
  return (
    <Card>
      <CardContent>
        <Text variant="title3" className="mb-4 font-semibold">
          Health Snapshot
        </Text>
        <View className="flex-row justify-between items-center">
          {/* Heart Rate */}
          <View className="items-center">
            <Image
              source={require('~/assets/icons/heartrate.png')}
              style={{ width: 36, height: 36, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text variant="body" className="text-muted-foreground">Heart Rate</Text>
            <Text variant="body" className="font-semibold mt-1">{heartRate}  BPM</Text>
          </View>

          {/* Blood Pressure */}
          <View className="items-center">
            <Image
              source={require('~/assets/icons/bloodpressure.png')}
              style={{ width: 36, height: 36, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text variant="body" className="text-muted-foreground">Blood Pressure</Text>
            <Text variant="body" className="font-semibold mt-1">{bloodPressure} mmHg</Text>
          </View>

          {/* Blood Sugar */}
          <View className="items-center">
            <Image
              source={require('~/assets/icons/glucometer.png')}
              style={{ width: 36, height: 36, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text variant="body" className="text-muted-foreground">Blood Sugar</Text>
            <Text variant="body" className="font-semibold mt-1">{bloodSugar}  mg/dL</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
