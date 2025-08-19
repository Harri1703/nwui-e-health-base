import { ScrollView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { FullWidthCard } from '~/components/General/FullWidthCard';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/nativewindui/Avatar';
import { useRouter } from 'expo-router';
import { FamilyList } from '~/components/Profile/FamilyList';
import { VitalsCard } from '~/components/Profile/VitalsCard';
import { InfoCard } from '~/components/Profile/InfoCard';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <ScrollView
        className="px-4"
        contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 32,
        }}
        >
        <View className="flex-row items-center mt-2">
            <Avatar alt="Sarah's profile picture" className="w-16 h-16">
                <AvatarImage source={require('~/assets/avatars/user1.jpg')} />
                <AvatarFallback><Text className="text-xl">SR</Text></AvatarFallback>
            </Avatar>
            <View className="ml-3">
                <Text variant="title1" className="font-semibold">Welcome back, Sarah</Text>
                <Text variant="body" className="text-muted-foreground">Your health dashboard</Text>
            </View>
            <View className="flex-1 items-end">
                <View className="bg-gray-200 rounded-full p-2">
                    <Ionicons name="pencil-outline" size={24}/>
                </View>
            </View>
        </View>
        <View className="mt-4">
            <VitalsCard
                bloodType="A+"
                height="165cm"
                weight="62kg"
                lastUpdatedLabel="Today, 2:30 PM"
            />
        </View>
        <View className="mt-4">
            <Text variant="title3" className="mb-4 font-semibold">Personal Information</Text>
            <FullWidthCard
                icon="person-outline"
                title="Full Name"
                subtitle="Sarah Johnson"
                showArrow={true}
            />
            <FullWidthCard
                icon="calendar-outline"
                title="Date of Birth"
                subtitle="January 1, 1996"
                showArrow={true}
            />
            <FullWidthCard
                icon="heart-outline"
                title="Gender"
                subtitle="Female"
                showArrow={true}
            />
            <FullWidthCard
                icon="call-outline"
                title="Conatct"
                subtitle="+1 234 567 8900"
                showArrow={true}
            />
        </View>
        <View className="mt-4">
            <Text variant="title3" className="font-semibold">Family Members</Text>
        </View>
        <View className="mt-4">
            <FamilyList
                members={[
                    {
                    id: '1',
                    name: 'Jane',
                    relation: 'Mom',
                    image: require('~/assets/avatars/user1.jpg'),
                    },
                    {
                    id: '2',
                    name: 'Lane',
                    relation: 'Aunt',
                    image: require('~/assets/avatars/user2.jpg'),
                    },
                    {
                    id: '3',
                    name: 'Emily',
                    relation: 'Sister',
                    image: require('~/assets/avatars/user3.jpg'),
                    },
                ]}
            />
        </View>
        <View className="mt-4">
            <Text variant="title3" className="font-semibold">Insurance</Text>
        </View>
        <View className="mt-4">
            <InfoCard
                icon="card-outline"
                title="Health Insurance"
                subtitle="Policy: HI-2024-0123456"
                bottomLeft="Expiry Date"
                bottomRight="31 Dec 2024"
                showArrow
            />
        </View>
        <View className="mt-4">
            <Text variant="title3" className="font-semibold">Health Financing</Text>
        </View>
        <View className="mt-4">
            <InfoCard
                icon="card-outline"
                title="Health Loan"
                subtitle="Status: Active"
                bottomLeft="Available Limit"
                bottomRight="$5,000"
                bottomRightColor="#22c55e"
                showArrow
            />
        </View>
    </ScrollView>
  );
}
