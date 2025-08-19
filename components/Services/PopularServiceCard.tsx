import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '~/components/nativewindui/Card';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { useColorScheme } from 'react-native';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  rating: string;
  price: string;
  cta: string;
};

export function PopularServiceCard({
  icon, title, subtitle, rating, price, cta,
}: Props) {
  const scheme = useColorScheme();
  const primary = scheme === 'dark' ? '#93c5fd' : '#2563eb';
  const star = scheme === 'dark' ? '#fde68a' : '#f59e0b';

  return (
    <Card>
      <CardContent className="p-4">
        <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center mb-2">
          <Ionicons name={icon} size={20} color={primary} />
        </View>

        <Text variant="body" className="font-semibold" numberOfLines={1}>{title}</Text>
        <Text variant="body" className="text-muted-foreground" numberOfLines={2}>{subtitle}</Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color={star} />
          <Text variant="body" className="ml-1 text-muted-foreground">{rating}</Text>
        </View>

        <View className="flex-row items-center justify-between mt-3">
          <Text variant="body" className="font-semibold">{price}</Text>
          <Button size="sm" className="h-8 px-3">
            <Text variant="body" className="text-primary-foreground">{cta}</Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
