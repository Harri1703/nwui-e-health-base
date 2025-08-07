import { ScrollView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { FeatureCard } from '~/components/General/FeatureCard';
import { FullWidthCard } from '~/components/General/FullWidthCard';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/nativewindui/Avatar';
import { useRouter } from 'expo-router';
import { HealthSnapshotCard } from '~/components/Dashboard/HealthSnapshot';
import { AppointmentCard } from '~/components/Dashboard/AppointmentCard';
import { DailyHealthTipCard } from '~/components/Dashboard/DailyHealthTipCard';
import { QuickActionCard } from '~/components/Dashboard/QuickActionCard';

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
        <View className="flex-row justify-between items-center mt-2">
            <View>
                <Text variant="title1" className="font-semibold">Welcome back, Sarah</Text>
                <Text variant="body" className="text-muted-foreground">Your health dashboard</Text>
            </View>
            <Avatar alt="Sarah's profile picture">
                <AvatarImage source={require('~/assets/avatars/user1.jpg')} />
                <AvatarFallback><Text>SR</Text></AvatarFallback>
            </Avatar>
        </View>
        <View className="mt-4">
            <HealthSnapshotCard
                heartRate="72"
                bloodPressure="120/80"
                bloodSugar="95"
            />
        </View>
        <View className="mt-4">
            <Text variant="title3" className="mb-4 font-semibold">Upcoming Appointments</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="mr-4">
                <AppointmentCard
                    name="Dr. Sarah Wilson"
                    specialty="Cardiologist"
                    time="Today, 2:00 PM"
                    avatar={require('~/assets/avatars/user3.jpg')}
                />
                </View>
                <View className="mr-4">
                <AppointmentCard
                    name="Dr. John Malik"
                    specialty="General Physician"
                    time="Tomorrow, 10:30 AM"
                    avatar={require('~/assets/avatars/user4.jpg')}
                />
                </View>
            </ScrollView>
        </View>
        <View className="mt-4">
            <Text variant="title3" className="font-semibold">Recent Records</Text>
        </View>
        <View className="mt-4 flex-row flex-wrap justify-between">
            <View className="w-[48%] mb-4">
            <FeatureCard
                icon="document-text-outline"
                title="Lab Report"
                subtitle="Jan 15, 2024"
            />
            </View>
            <View className="w-[48%] mb-4">
            <FeatureCard
                icon="document-outline"
                title="Prescription"
                subtitle="Jan 12, 2024"
            />
            </View>
            <View className="w-[48%] mb-4">
            <FeatureCard
                icon="albums-outline"
                title="X-Ray Report"
                subtitle="Jan 10, 2024"
            />
            </View>
            <View className="w-[48%] mb-4">
            <FeatureCard
                icon="medkit-outline"
                title="Health Check"
                subtitle="Jan 5, 2024"
            />
            </View>
        </View>
        <View className="mt-4">
            <DailyHealthTipCard
                tip="Stay hydrated! Drinking enough water helps maintain energy levels and supports overall health."
            />
        </View>
        <View className="mt-6 flex-row flex-wrap justify-between">
            <View className="w-[48%] mb-4">
                <QuickActionCard title="Upload Record" icon="cloud-upload-outline" />
            </View>
            <View className="w-[48%] mb-4">
                <QuickActionCard title="Book Appointment" icon="calendar-outline" />
            </View>
            <View className="w-[48%] mb-4">
                <QuickActionCard title="Start Consultation" icon="videocam-outline" />
            </View>
            <View className="w-[48%] mb-4">
                <QuickActionCard title="Health Locker" icon="lock-closed-outline" />
            </View>
        </View>
    </ScrollView>
  );
}
