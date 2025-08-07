import { ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    return (
    <ScrollView
      className="px-4"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 32,
      }}
    >
        <Text variant="title2" className="mt-2 font-semibold">
            Records
        </Text>
    </ScrollView>
)}
