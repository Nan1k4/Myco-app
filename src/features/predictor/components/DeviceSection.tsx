import { Linking, StyleSheet, View } from 'react-native';
import { Button } from '../../../components/Button';
import { StatusBanner } from '../../../components/ui';
import { SPACE } from '../../../theme';
import { describeLocation } from '../format';
import { DEVICE_KEY, type ForecastState } from '../store/forecastStore';
import { forecastStore } from '../store/instance';
import { ForecastRow } from './ForecastRow';

interface DeviceSectionProps {
  readonly state: ForecastState;
  readonly onOpenDetails: () => void;
}

export function DeviceSection({ state, onOpenDetails }: DeviceSectionProps) {
  const entry = state.entries[DEVICE_KEY];
  const busy = entry?.status.kind === 'loading';
  const check = () => void forecastStore.refresh(DEVICE_KEY);
  const { deviceLocation } = state;

  const buttonLabel = busy
    ? deviceLocation.status === 'requesting'
      ? 'Ustalam lokalizację…'
      : 'Pobieram pogodę…'
    : entry?.stored
      ? 'Odśwież moją okolicę'
      : 'Sprawdź wysyp w mojej okolicy';

  return (
    <View style={styles.section}>
      {entry?.stored ? (
        <ForecastRow
          title="Twoja okolica"
          subtitle={describeLocation(entry.stored.location)}
          entry={entry}
          onPress={onOpenDetails}
        />
      ) : null}

      <Button
        label={buttonLabel}
        icon="locate-outline"
        variant={entry?.stored ? 'tinted' : 'filled'}
        loading={busy}
        onPress={check}
      />

      {deviceLocation.status === 'permission_denied' && !busy ? (
        <StatusBanner
          tone="warning"
          message={
            deviceLocation.canAskAgain
              ? 'Bez dostępu do lokalizacji nie sprawdzę Twojej okolicy. Możesz wybrać miejsce niżej.'
              : 'Dostęp do lokalizacji jest zablokowany. Włącz go w ustawieniach albo wybierz miejsce niżej.'
          }
          action={!deviceLocation.canAskAgain ? { label: 'Otwórz ustawienia', onPress: () => void Linking.openSettings() } : undefined}
        />
      ) : null}

      {deviceLocation.status === 'error' && !busy ? <StatusBanner tone="warning" message={deviceLocation.message} /> : null}
      {deviceLocation.status === 'resolved' && entry?.status.kind === 'error' ? (
        <StatusBanner tone="warning" message={entry.status.message} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: SPACE.m },
});