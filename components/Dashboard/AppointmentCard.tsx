import { View, Image } from 'react-native';
import { Card, CardContent } from '~/components/nativewindui/Card';
import { Text } from '~/components/nativewindui/Text';
import { Ionicons } from '@expo/vector-icons';

type AppointmentCardProps = {
  name: string;
  specialty: string;
  time: string;
  avatar: any;
};

export function AppointmentCard({ name, specialty, time, avatar }: AppointmentCardProps) {
  return (
    <Card className="w-64 rounded-xl overflow-hidden">
      <CardContent className="p-4">
        <View className="flex-row items-center space-x-4">
          {/* Doctor Avatar */}
          <Image
            source={avatar}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            resizeMode="cover"
          />

          {/* Info */}
          <View className="flex-1 ml-2">
            <Text variant="body" className="font-semibold" numberOfLines={1}>
              {name}
            </Text>
            <Text variant="body" className="text-muted-foreground" numberOfLines={1}>
              {specialty}
            </Text>
          </View>
        </View>

        {/* Time & Video Row */}
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center space-x-1">
            <Ionicons name="time-outline" size={14} color="#6b7280" className='mr-2'/>
            <Text variant="body" className="text-muted-foreground">{time}</Text>
          </View>
          <Ionicons name="videocam-outline" size={16} color="#3b82f6" />
        </View>
      </CardContent>
    </Card>
  );
}
