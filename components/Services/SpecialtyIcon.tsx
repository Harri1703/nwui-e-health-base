import { View, Image } from "react-native";
import { Text } from "~/components/nativewindui/Text";

type SpecialtyIconProps = {
  icon: any; 
  label: string;
};

export function SpecialtyIcon({ icon, label }: SpecialtyIconProps) {
  return (
    <View className="items-center w-[25%] mb-4">
      <Image
        source={icon}
        style={{ width: 40, height: 40, marginBottom: 6 }}
        resizeMode="contain"
      />
      <Text
        variant="footnote"
      >
        {label}
      </Text>
    </View>
  );
}
