// app/(tabs)/_layout.tsx (or wherever your TabLayout lives)
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import * as React from 'react';
import { Platform, Pressable, PressableProps, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Badge } from '~/components/nativewindui/Badge';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

type IconProps = React.ComponentProps<typeof Ionicons>;
const Icon = Ionicons;

export default function TabLayout() {
  const { colors } = useColorScheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Tabs' }} />
      <Tabs
        tabBar={TAB_BAR}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon(props) {
              return <Icon name="home" {...props} size={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="Records"
          options={{
            title: 'Records',
            tabBarIcon(props) {
              return <Icon name="folder" {...props} size={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="Services"
          options={{
            title: 'Services',
            tabBarIcon(props) {
              return <Icon name="medkit" {...props} size={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="Wellness"
          options={{
            title: 'Wellness',
            tabBarIcon(props) {
              return <Icon name="leaf" {...props} size={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon(props) {
              return <Icon name="person" {...props} size={27} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}

const TAB_BAR = Platform.select({
  ios: undefined,
  android: (props: BottomTabBarProps) => <MaterialTabBar {...props} />,
});

const TAB_ICON = {
  index: 'home',
  Records: 'folder',
  Services: 'medkit',
  Wellness: 'leaf',
  Profile: 'person',
} as const;

function MaterialTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className="border-t-border/25 bg-card flex-row border-t pb-4 pt-3 dark:border-t-0"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <MaterialTabItem
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            name={TAB_ICON[route.name as keyof typeof TAB_ICON]}
            isFocused={isFocused}
            badge={options.tabBarBadge}
            label={
              typeof label === 'function'
                ? label({
                    focused: isFocused,
                    color: isFocused ? colors.foreground : colors.grey2,
                    children: options.title ?? route.name ?? '',
                    position: options.tabBarLabelPosition ?? 'below-icon',
                  })
                : label
            }
          />
        );
      })}
    </View>
  );
}

function MaterialTabItem({
  isFocused,
  name = 'star',
  badge,
  className,
  label,
  ...pressableProps
}: {
  isFocused: boolean;
  name: IconProps['name'];
  label: string | React.ReactNode;
  badge?: number | string;
} & Omit<PressableProps, 'children'>) {
  const { colors } = useColorScheme();

  // Reanimated values for focus transitions
  const isFocusedDerived = useDerivedValue(() => isFocused);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: withTiming(isFocusedDerived.value ? 1 : 0, { duration: 180 }),
      transform: [
        {
          scaleY: withTiming(isFocusedDerived.value ? 1 : 0.96, { duration: 180 }),
        },
      ],
      borderRadius: 14,
    };
  });

  return (
    <Pressable
      className={cn(
        // Full-tab hit area; rounded so the highlight looks like a pill
        'flex-1 mx-2 rounded-xl overflow-hidden relative items-center justify-center py-2',
        className
      )}
      {...pressableProps}
    >
      {/* Full-size animated highlight (covers icon + label) */}
      <Animated.View style={animatedStyle} className="bg-secondary/70 dark:bg-secondary" />

      {/* Foreground content */}
      <View className="items-center">
        <Icon size={24} name={name} color={isFocused ? colors.foreground : colors.grey2} />
        {!!badge && <Badge>{badge}</Badge>}
        <Text variant="caption2" className={cn('pt-1', !isFocused && 'text-muted-foreground')}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
