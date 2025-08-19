import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '~/components/nativewindui/Card';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';

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

  // Height budget notes:
  // - We reserve space for up to 2 lines of subtitle (lineHeight * 2).
  // - CardContent gets a minHeight so all cards in the carousel visually match.
  const SUBTITLE_LINE_HEIGHT = 20;
  const CARD_MIN_HEIGHT = 180;

  return (
    <Card>
      <CardContent className="p-4" style={{ minHeight: CARD_MIN_HEIGHT }}>
        {/* column layout with space distribution so bottoms align */}
        <View className="flex-1 justify-between">
          {/* Top: icon + title + subtitle (subtitle has fixed box) */}
          <View>
            <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center mb-2">
              <Ionicons name={icon} size={20} color={primary} />
            </View>

            <Text variant="body" className="font-semibold" numberOfLines={1}>
              {title}
            </Text>

            {/* Reserve a fixed-height area for 2 lines to prevent card height drift */}
            <View style={{ height: SUBTITLE_LINE_HEIGHT * 2, marginTop: 2 }}>
              <Text
                variant="body"
                className="text-muted-foreground"
                numberOfLines={2}
                // a set lineHeight makes the 2-line block predictable on all phones
                style={{ lineHeight: SUBTITLE_LINE_HEIGHT }}
              >
                {subtitle}
              </Text>
            </View>
          </View>

          {/* Bottom: rating + price/CTA kept together so bottoms align across cards */}
          <View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={14} color={star} />
              <Text variant="body" className="ml-1 text-muted-foreground">
                {rating}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mt-3">
              <Text variant="body" className="font-semibold">{price}</Text>
              <Button size="sm" className="h-8 px-3">
                <Text variant="body" className="text-primary-foreground">{cta}</Text>
              </Button>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
