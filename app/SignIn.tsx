import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { TextField } from '~/components/nativewindui/TextField';
import { useColorScheme } from '~/lib/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const ICON_SIZE = 24;
  const hospital_icon = require('~/assets/icons/hospital.png');

  return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 32,
      }}
    >
      <View className="items-center mt-4">
        <Image source={hospital_icon} style={{ width: 50, height: 50 }} />
        <Text variant="title2" className="mt-2 font-semibold">
          HealthCare
        </Text>
        <Text variant="body" className="text-gray-500 mt-1">
          Your Health, Our Priority
        </Text>
      </View>

      <View className="mt-8">
        <Text variant="title3">Welcome Back</Text>
        <Text variant="body" className="text-gray-500">
          Sign in to access your healthcare services
        </Text>
      </View>

      <View className="mt-6">
        <TextField
          label="Mobile Number"
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
        />
      </View>

      <View className="mt-4">
        <TextField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      <View className="mt-6">
        <Button
          variant="primary"
          onPress={() => router.push('/(tabs)')}
        >
          <Text>Sign In</Text>
        </Button>
      </View>

      <View className="mt-3 items-center">
        <Text variant="footnote" className="text-primary">Forgot Password?</Text>
      </View>

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-border" />
        <Text variant="footnote" className="mx-2 text-gray-500">Or continue with</Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      <View className="mt-2">
        <Button variant="secondary" onPress={() => router.push('/(tabs)')}>
          <Ionicons
            name="mail-outline"
            size={ICON_SIZE}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
            style={{ marginRight: 8 }}
          />
          <Text>Login with OTP</Text>
        </Button>
      </View>

      <View className="mt-6 flex-row items-center justify-center">
        <Text variant="footnote" className="ml-2">Don't have an account? <Text className="text-primary" variant="footnote" onPress={() => router.push('/CreateAccount')}>Sign Up</Text></Text>
      </View>

      <View className="mt-6 flex-row items-center justify-center">
        <Text variant="footnote" className="ml-2 text-center">By continuing you agree to our <Text className="text-primary" variant="footnote">Privacy Policy</Text> and <Text className="text-primary" variant="footnote">Terms of Service</Text></Text>
      </View>
    </ScrollView>
  );
}
