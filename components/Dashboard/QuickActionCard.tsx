import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardTitle } from '../nativewindui/Card';
import { Text } from '../nativewindui/Text';

type QuickActionCardProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function QuickActionCard({ title, icon }: QuickActionCardProps) {
  return (
    <Card>
      <CardContent className="h-28 justify-center items-center">
        <CardTitle className="text-base flex items-center justify-center">
          <Ionicons name={icon} size={27} />
        </CardTitle>
        <Text variant="body" className="text-center mt-2">{title}</Text>
      </CardContent>
    </Card>
  );
}
