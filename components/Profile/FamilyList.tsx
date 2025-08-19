import { ScrollView, View, Image } from 'react-native';
import { Text } from '~/components/nativewindui/Text';

type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  image: any; // require('...') or { uri: '...' }
};

type FamilyListProps = {
  members: FamilyMember[];
};

export function FamilyList({ members }: FamilyListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {members.map((member) => (
        <View key={member.id} className="items-center mr-4">
          <Image
            source={member.image}
            style={{ width: 150, height: 150, borderRadius: 12 }}
            resizeMode="cover"
          />
          <Text variant="body" className="font-semibold mt-2">
            {member.name}
          </Text>
          <Text variant="footnote" className="text-muted-foreground">
            {member.relation}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
