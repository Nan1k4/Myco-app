import { useRouter } from 'expo-router';
import { useCallback, useState, type ReactNode } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { SavedPlaceId } from '../../domain';
import { COLORS, SPACE, TYPE } from '../../theme';
import { CustomPlaceSection } from './components/CustomPlaceSection';
import { DeviceSection } from './components/DeviceSection';
import { SavedPlacesSection } from './components/SavedPlacesSection';
import { CUSTOM_KEY, DEVICE_KEY, type ForecastKey } from './store/forecastStore';
import { useAutoRefresh, useForecastState } from './store/hooks';
import { forecastStore } from './store/instance';

export function PredictorScreen() {
  const state = useForecastState();
  const router = useRouter();
  useAutoRefresh();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await forecastStore.refreshAll();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const openDetails = (key: ForecastKey) => router.push({ pathname: '/forecast/[key]', params: { key } });

  if (!state.hydrated) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <Section title="Sprawdź wysyp">
        <View style={styles.stack}>
          <DeviceSection state={state} onOpenDetails={() => openDetails(DEVICE_KEY)} />
          <CustomPlaceSection state={state} onOpenDetails={() => openDetails(CUSTOM_KEY)} />
        </View>
      </Section>

      <Section title="Zapisane miejsca">
        <SavedPlacesSection state={state} onOpenDetails={(id: SavedPlaceId) => openDetails(id)} />
      </Section>

      <Text style={styles.disclaimer}>
        Indeks 0-100 to heurystyka oparta na pogodzie.
      </Text>
    </ScrollView>
  );
}

function Section({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle} accessibilityRole="header">
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { alignItems: 'center', justifyContent: 'center' },
  content: { padding: SPACE.l, gap: SPACE.xl, paddingBottom: SPACE.xxl },
  section: { gap: SPACE.m },
  stack: { gap: SPACE.m },
  sectionTitle: { ...TYPE.overline, color: COLORS.textMuted, paddingHorizontal: SPACE.xs },
  disclaimer: { ...TYPE.caption, color: COLORS.textSubtle, textAlign: 'center' },
});