import { ScrollView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { FullWidthCard } from '~/components/General/FullWidthCard';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const check_icon = require('~/assets/icons/check.png');

  return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 32,
      }}
    >
      <View className="items-center mt-4 text">
        <Image source={check_icon} style={{ width: 50, height: 50 }} />
        <Text variant="title1" className="mt-2 font-semibold">
          Welcome to HealthCare+
        </Text>
        <Text variant="title3" className="mt-2 font-semibold">
          Your account is raeady!
        </Text>
        <Text variant="body" className="text-gray-500 mt-1 text-center">
          We're excited to help you manage your healthcare journey
        </Text>
      </View>
      <View className="mt-2">
        <FullWidthCard
            icon="stats-chart-outline"
            title="Health Dashboard"
            subtitle="Track your vitals and health metrics in one place"
        />
      </View>
      <View className="mt-2">
        <FullWidthCard
            icon="document-text-outline"
            title="Medical Records"
            subtitle="Access your complete medical records anytime"
        />
      </View>
      <View className="mt-2">
        <FullWidthCard
            icon="calendar-outline"
            title="Appointments"
            subtitle="Schedule and manage your medical visits"
        />
      </View>
      <View className="mt-2">
        <Text variant="title2">What's Next?</Text>
      </View>    
      <View className="mt-2">
        <FullWidthCard
            icon="person-outline"
            title='Complete Your Profile'
            showArrow={true}
        />
      </View>
      <View className="mt-2">
        <FullWidthCard
            icon="call-outline"
            title='Set up emergency contacts'
            showArrow={true}
        />
      </View>
      <View className="mt-2">
        <FullWidthCard
            icon="settings-outline"
            title='Schedule your first checkup'
            showArrow={true}
        />
      </View>
      <View className="mt-2">
        <Button variant="primary">
          <Text variant="title2">Get Started</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
