import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '~/components/nativewindui/Card';
import { Text } from '~/components/nativewindui/Text';

type Tone = 'success' | 'warning' | 'info';

type Props = {
  title: string;
  provider: string;
  time: string;
  place: string;
  status: string;
  statusTone?: Tone;
};

export function UpcomingServiceItem({
  title, provider, time, place, status, statusTone = 'info',
}: Props) {
  const bg =
    statusTone === 'success'
      ? 'bg-emerald-100 dark:bg-emerald-900/40'
      : statusTone === 'warning'
      ? 'bg-amber-100 dark:bg-amber-900/40'
      : 'bg-blue-100 dark:bg-blue-900/40';

  const text =
    statusTone === 'success'
      ? 'text-emerald-700 dark:text-emerald-300'
      : statusTone === 'warning'
      ? 'text-amber-700 dark:text-amber-300'
      : 'text-blue-700 dark:text-blue-300';

  return (
    <Card className="rounded-xl mb-3">
      <CardContent className="p-4">
        <View className="flex-row items-center justify-between">
          <Text variant="body" className="font-semibold">{title}</Text>
          <View className={`px-2 py-1 rounded-full ${bg}`}>
            <Text variant="body" className={`font-medium ${text}`}>{status}</Text>
          </View>
        </View>

        <Text variant="body" className="text-muted-foreground mt-0.5">{provider}</Text>

        <View className="flex-row items-center mt-3">
          <Ionicons name="time-outline" size={14} color="#9ca3af" />
          <Text variant="body" className="ml-2 text-muted-foreground">{time}</Text>
          <Ionicons name="ellipse" size={4} color="#9ca3af" style={{ marginHorizontal: 8 }} />
          <Ionicons name="location-outline" size={14} color="#9ca3af" />
          <Text variant="body" className="ml-2 text-muted-foreground">{place}</Text>
        </View>
      </CardContent>
    </Card>
  );
}
