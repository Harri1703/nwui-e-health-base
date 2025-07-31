import { Text } from '../nativewindui/Text';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardDescription, CardTitle } from '../nativewindui/Card';

type FeatureCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  iconColor?: string;
};

export function FeatureCard({ icon, title, subtitle, iconColor }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="h-28 justify-center">
        <CardTitle className="text-base">
          <Ionicons name={icon} size={24} color={iconColor || "#2563eb"} />
        </CardTitle>
        <Text variant="body">{title}</Text>
        <CardDescription className="text-sm mt-1">{subtitle}</CardDescription>
      </CardContent>
    </Card>
  );
}