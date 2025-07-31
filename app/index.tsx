import { ScrollView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { FeatureCard } from '~/components/General/FeatureCard';
import { FullWidthCard } from '~/components/General/FullWidthCard';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/nativewindui/Avatar';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 32,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center space-x-2">
        <Image
          source={require('~/assets/icons/healthhub.png')}
          className="w-8 h-8"
          resizeMode="contain"
        />
        <Text variant="title2">HealthHub</Text>
      </View>

      {/* Text */}
      <Text variant="title2" className="mt-2">
        Your Personal Health Hub
      </Text>
      <Text variant="subhead" className="mt-4">
        Securely store your health records—forever ensuring complete privacy and confidentiality.
      </Text>

      {/* Hero Image */}
      <View className="mt-6">
        <Image
          source={require('~/assets/images/doctor_tablet.jpg')}
          className="w-full h-72 rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Feature Cards */}
      <View className="mt-6 flex-row flex-wrap justify-between">
        <View className="w-[48%] mb-4">
          <FeatureCard
            icon="document-text-outline"
            title="Medical Records"
            subtitle="Access your complete history"
          />
        </View>
        <View className="w-[48%] mb-4">
          <FeatureCard
            icon="calendar-outline"
            title="Appointments"
            subtitle="Schedule with ease"
          />
        </View>
        <View className="w-[48%] mb-4">
          <FeatureCard
            icon="videocam-outline"
            title="Telemedicine"
            subtitle="Virtual consultations"
          />
        </View>
        <View className="w-[48%] mb-4">
          <FeatureCard
            icon="medkit-outline"
            title="Lab Reports"
            subtitle="Track your results"
          />
        </View>
      </View>

      <FullWidthCard
        icon="shield-outline"
        title="Your Data is Secured"
        subtitle="ABDM compliant encryption"
        showArrow={true}
        iconColor='#22c55e'
      />

      <Button variant="primary">
        <Text variant="title2">Create Account</Text>
      </Button>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-border" />
        <Text variant="body">or</Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      <Button variant="secondary">
        <Text variant="title2">Sign In</Text>
      </Button>

      <View className="mt-6">
        <FullWidthCard
          icon="people-outline"
          title="Connect with Healthcare Providers"
          subtitle="Direct access to your medical team"
          showArrow={true}
        />
        <FullWidthCard
          icon="time-outline"
          title="Book Appointments Instantly"
          subtitle="Save time with online scheduling"
          showArrow={true}
        />
        <FullWidthCard
          icon="business-outline"
          title="Access Your Records Anytime"
          subtitle="Your complete medical history in one place"
          showArrow={true}
        />
        <FullWidthCard
          icon="shield-checkmark-outline"
          title="Trusted Security"
          subtitle="End-to-end encryption"
          showArrow={false}
          iconColor="#22c55e"
        />
        <View className='justify-center items-center'>
          <Text variant="body">Join thousands of users managing their health</Text>
        </View>

        <View className="flex-row justify-center">
          <View className="flex-row"></View>
            <View className="-ml-0">
              <Avatar alt="Avatar of user AB">
              <AvatarImage source={require('~/assets/avatars/user1.jpg')} />
              <AvatarFallback><Text>AB</Text></AvatarFallback>
              </Avatar>
            </View>
            <View className="-ml-4">
              <Avatar alt="Avatar of user CD">
              <AvatarImage source={require('~/assets/avatars/user2.jpg')} />
              <AvatarFallback><Text>CD</Text></AvatarFallback>
              </Avatar>
            </View>
            <View className="-ml-4">
              <Avatar alt="Avatar of user EF">
              <AvatarImage source={require('~/assets/avatars/user3.jpg')} />
              <AvatarFallback><Text>EF</Text></AvatarFallback>
              </Avatar>
            </View>
            <View className="-ml-4">
              <Avatar alt="Avatar of user GH">
              <AvatarImage source={require('~/assets/avatars/user4.jpg')} />
              <AvatarFallback><Text>GH</Text></AvatarFallback>
              </Avatar>
            </View>
          </View>
      </View>
    </ScrollView>
  );
}
