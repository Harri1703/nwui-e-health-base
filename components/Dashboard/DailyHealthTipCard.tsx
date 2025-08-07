import { Card, CardContent } from '~/components/nativewindui/Card';
import { Text } from '~/components/nativewindui/Text';

type DailyHealthTipCardProps = {
  tip: string;
};

export function DailyHealthTipCard({ tip }: DailyHealthTipCardProps) {
  return (
    <Card className="rounded-xl mb-4">
      <CardContent className="space-y-2 p-4">
        <Text variant="title3" className="font-semibold">Daily Health Tip</Text>
        <Text variant="body">{tip}</Text>
        <Text variant="body" className="text-blue-600 dark:text-blue-400 font-medium">
          Read More
        </Text>
      </CardContent>
    </Card>
  );
}
