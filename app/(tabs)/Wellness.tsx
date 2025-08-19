import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/nativewindui/Text';
import { WellnessCard } from '~/components/Wellness/WellnessCard';
import { TipCard } from '~/components/Wellness/TipCard';
import { FeatureCard } from '~/components/General/FeatureCard';
import { ArticleCard } from '~/components/Wellness/ArticleCard';
import { CategoryCard } from '~/components/Wellness/CategoryCard';

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
        <View className="flex-row justify-between items-center mt-2">
            <View>
            <Text variant="title1" className="font-semibold">Wellness</Text>
            <Text variant="body" className="text-muted-foreground">
                Your personal health guide
            </Text>
            </View>
        </View>

        <View className="mt-4">
            <WellnessCard score={84} steps="8,439" sleep="7.5h" heartRate="72 bpm" />
        </View>

        <View className="mt-6">
            <Text variant="title3" className="font-semibold mb-3">
                Today&apos;s Health Tips
            </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TipCard
                icon="nutrition-outline"
                title="Healthy Eating"
                subtitle="10 superfoods for better health"
                onPress={() => console.log("Open Healthy Eating")}
            />
            <TipCard
                icon="walk-outline"
                title="Exercise"
                subtitle="30-minute routine you can keep"
            />
            <TipCard
                icon="moon-outline"
                title="Better Sleep"
                subtitle="Wind-down checklist"
            />
        </ScrollView>
        <View className="mt-4">
            <Text variant="title3" className="font-semibold mb-3">
                Wellness Tools
            </Text>
        </View>
        <View className="mt-4 flex-row flex-wrap justify-between">
            <View className="w-[48%] mb-4">
                <FeatureCard
                    icon="medkit-outline"
                    title="Drug Information"
                    subtitle="Search medications & effects"
                />
            </View>
            <View className="w-[48%] mb-4">
                <FeatureCard
                    icon="heart-circle-outline"
                    title="Symptom Checker"
                    subtitle="Identify health concerns"
                />
            </View>
            <View className="w-[48%] mb-4">
                <FeatureCard
                    icon="shield-checkmark-outline"
                    title="Health Trends"
                    subtitle="Track your vitals"
                />
            </View>
            <View className="w-[48%] mb-4">
                <FeatureCard
                    icon="bar-chart-outline"
                    title="Interaction Checker"
                    subtitle="Check drug interactions"
                />
            </View>
        </View>
        <View className="mt-2">
            <Text variant="title3" className="font-semibold mb-3">
                Health Education
            </Text>
        </View>
        <View className='mt-4'>
            <ArticleCard
                image={require("~/assets/images/hearthealth.jpg")}
                title="Understanding Heart Health"
                subtitle="Learn about cardiovascular health and prevention"
                readTime="5 min read"
                onPress={() => console.log("Open Heart Health")}
            />
            <ArticleCard
                image={require("~/assets/images/nutrition.jpg")}
                title="Nutrition Basics"
                subtitle="Essential nutrients for optimal health"
                readTime="4 min read"
                onPress={() => console.log("Open Nutrition")}
            />
        </View>
        <View className="mt-2">
            <Text variant="title3" className="font-semibold mb-3">
                Lifestyle and Wellness
            </Text>
        </View>
        <View className="flex-row justify-between">
            <CategoryCard
                icon="nutrition-outline"
                iconColor="#f97316" // orange
                title="Diet & Nutrition"
            />
            <CategoryCard
                icon="walk-outline"
                iconColor="#22c55e" // green
                title="Exercise & Fitness"
            />
            <CategoryCard
                icon="bulb-outline"
                iconColor="#3b82f6" // blue
                title="Mental Wellness"
            />
      </View>
    </ScrollView>
  );
}
