import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';
import { Icon, type IconName } from '../../src/components/icons/Icon';
import { COLORS } from '../../src/theme';

function tabIcon(name: IconName) {
  return ({ color, size, focused }: { readonly color: ColorValue; readonly size: number; readonly focused: boolean }) => (
    <Icon
      name={name}
      size={size}
      color={typeof color === 'string' ? color : COLORS.inactive}
      strokeWidth={focused ? 2.2 : 1.75}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '700', color: COLORS.text },
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.borderSubtle,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Wysyp', headerTitle: 'Prognoza wysypu', tabBarIcon: tabIcon('rain') }}
      />
      <Tabs.Screen
        name="database"
        options={{ title: 'Atlas', headerShown: false, tabBarIcon: tabIcon('book') }}
      />
      <Tabs.Screen
        name="filter"
        options={{ title: 'Klucz', headerShown: false, tabBarIcon: tabIcon('sliders') }}
      />
    </Tabs>
  );
}