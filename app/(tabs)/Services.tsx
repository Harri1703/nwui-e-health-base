import { ScrollView, View, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/nativewindui/Text';
import { QuickActionCard } from '~/components/General/QuickActionCard';
import { PopularServiceCard } from '~/components/Services/PopularServiceCard';
import { SpecialtyIcon } from '~/components/Services/SpecialtyIcon';
import { UpcomingServiceItem } from '~/components/Services/UpcomingServiceItem';

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const muted = scheme === 'dark' ? '#94a3b8' : '#6b7280';
  const icon = scheme === 'dark' ? '#cbd5e1' : '#94a3b8';

  return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 28,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text variant="title2" className="font-semibold mt-1">Healthcare Services</Text>

      {/* Search + actions */}
      <View className="mt-3 flex-row items-center">
        <View className="flex-1 flex-row items-center rounded-2xl bg-muted/40 dark:bg-muted/30 px-3 py-2">
          <Ionicons name="search" size={18} color={icon} />
          <TextInput
            placeholder="Search services, doctors..."
            placeholderTextColor={muted}
            className="ml-2 flex-1 text-foreground"
          />
          <TouchableOpacity className="ml-2">
            <Ionicons name="funnel-outline" size={18} color={icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="ml-3 rounded-full border border-border px-2.5 py-2">
          <Ionicons name="notifications-outline" size={18} color={icon} />
        </TouchableOpacity>
      </View>

      {/* Services grid */}
      <View className="mt-6 flex-row flex-wrap justify-between">
        <View className="w-[48%] mb-4">
            <QuickActionCard title="Doctor Consultation" icon="heart-outline" />
        </View>
        <View className="w-[48%] mb-4">
            <QuickActionCard title="Lab Tests" icon="flask-outline" />
        </View>
        <View className="w-[48%] mb-4">
            <QuickActionCard title="Medical Scans" icon="scan-outline" />
        </View>
        <View className="w-[48%] mb-4">
            <QuickActionCard title="Home Collection" icon="medkit-outline" />
        </View>
     </View>

      {/* Popular Services */}
      <Text variant="title3" className="mt-5 mb-3 font-semibold">Popular Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        <View className="w-64 mr-4">
          <PopularServiceCard
            icon="people-outline"
            title="General Checkup"
            subtitle="Complete body examination"
            rating="4.8"
            price="$99"
            cta="Book Now"
          />
        </View>
        <View className="w-64 mr-4">
          <PopularServiceCard
            icon="beaker-outline"
            title="Blood Tests"
            subtitle="Comprehensive analysis"
            rating="4.7"
            price="$49"
            cta="Book Now"
          />
        </View>
        <View className="w-64">
          <PopularServiceCard
            icon="scan-outline"
            title="Medical Scans"
            subtitle="Advanced imaging"
            rating="4.9"
            price="$120"
            cta="Book Now"
          />
        </View>
      </ScrollView>

      {/* Medical Specialties */}
      <Text variant="title3" className="mt-5 mb-3 font-semibold">Medical Specialties</Text>
      <View className="flex-row flex-wrap justify-between mt-4">
        <SpecialtyIcon icon={require("~/assets/icons/eyecare.png")} label="Eye Care" />
        <SpecialtyIcon icon={require("~/assets/icons/cardiology.png")} label="Cardiology" />
        <SpecialtyIcon icon={require("~/assets/icons/pulmonology.png")} label="Pulmonology" />
        <SpecialtyIcon icon={require("~/assets/icons/orthopedics.png")} label="Orthopedics" />
        <SpecialtyIcon icon={require("~/assets/icons/neurology.png")} label="Neurology" />
        <SpecialtyIcon icon={require("~/assets/icons/dental.png")} label="Dental" />
        <SpecialtyIcon icon={require("~/assets/icons/general.png")} label="General" />
        <SpecialtyIcon icon={require("~/assets/icons/lab.png")} label="Lab" />
      </View>

      {/* Upcoming Services */}
      <Text variant="title3" className="mt-6 mb-3 font-semibold">Your Upcoming Services</Text>
      <View className="mb-4">
        <UpcomingServiceItem
            title="General Checkup"
            provider="Dr. Sarah Johnson"
            time="Today, 2:30 PM"
            place="At Clinic"
            status="Confirmed"
            statusTone="success"
        />
      </View>
      <View className="mb-4">
        <UpcomingServiceItem
            title="Blood Test"
            provider="Lab Testing Center"
            time="Tomorrow, 10:00 AM"
            place="At Clinic"
            status="Pending"
            statusTone="warning"
        />
      </View>
      {/* bottom padding handled by contentContainerStyle */}
    </ScrollView>
  );
}
