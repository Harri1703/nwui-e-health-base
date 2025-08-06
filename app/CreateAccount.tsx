import { ScrollView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { TextField } from '~/components/nativewindui/TextField';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { Picker } from '~/components/nativewindui/Picker';
import { Checkbox } from '~/components/nativewindui/Checkbox';
import { useColorScheme } from '~/lib/useColorScheme';
import React from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [dob, setDob] = React.useState(new Date());
  const [picker, setPicker] = React.useState('Male');
  const GoogleIcon = require('~/assets/icons/google_icon.png');
  const AppleIconWhite = require('~/assets/icons/apple_white.png');
  const AppleIconBlack = require('~/assets/icons/apple_black.png');
  const ICON_SIZE = 30;
  const GoogleIconImg = (
    <Image source={GoogleIcon} style={{ width: ICON_SIZE, height: ICON_SIZE, marginRight: 8 }} />
  );
  const AppleIconImg = (
    <Image
        source={colorScheme === 'dark' ? AppleIconWhite : AppleIconBlack}
        style={{ width: ICON_SIZE, height: ICON_SIZE, marginRight: 8 }}
    />
 );
  return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 32,
      }}
    >
        <Text variant="title1">Create Account</Text>
        <Text variant="body">Join us to manage your healthcare journey</Text>
        <View className="mt-4">
            <TextField
                label="Fullname"
                placeholder="Enter your fullname"
            />
        </View>
        <View className="mt-4">
            <TextField
                label="Mobile Number"
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
            />
        </View>
        <View className="mt-4">
            <DatePicker
            value={dob}
            mode="date"
            onChange={(event) => {
                if (event?.nativeEvent?.timestamp) {
                setDob(new Date(event.nativeEvent.timestamp));
                }
            }}
            />
        </View>
        <View className="mt-4">
            <Picker
                selectedValue={picker}
                onValueChange={setPicker}
                placeholder="Select Gender"
                items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                ]}
            />
        </View>
        <View className="mt-4">
            <TextField
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
            />
        </View>
        <View className="mt-2">
            <Text variant="caption1">Must be at least 8 characters</Text>
        </View>
        <View className="flex-row items-center mt-4">
            <Checkbox />
            <Text variant="footnote" className="ml-2">
                I agree to the <Text className="text-primary" variant="footnote">Terms of Service</Text> and <Text className="text-primary" variant="footnote">Privacy Policy</Text>
            </Text>
        </View>
        <View className="mt-6">
            <Button variant="primary" onPress={() => router.push('/Welcome')}>
                <Text>Create Account</Text>
            </Button>
        </View>
        <View className="flex-row items-center my-4 mt-4">
            <View className="flex-1 h-px bg-border" />
            <Text variant="footnote">Or sign up with</Text>
            <View className="flex-1 h-px bg-border" />
        </View>
        <View className='mt-4'>
            <Button variant="secondary" onPress={() => router.push('/Welcome')}>
                {GoogleIconImg}
                <Text>Continue with Google</Text>
            </Button>
        </View>
        <View className='mt-4'>
            <Button variant="secondary" onPress={() => router.push('/Welcome')}>
                {AppleIconImg}
                <Text>Continue with Apple</Text>
            </Button>
        </View>
        <View className="mt-4">
            <Text variant="footnote" className="text-center">
                Already have an account? <Text variant="footnote" className="text-primary" onPress={() => router.push('/SignIn')}>Sign In</Text>
            </Text>
        </View>
    </ScrollView>
  );
}
