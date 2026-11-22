import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { SegmentedControl, SurfaceCard, type SegmentOption } from '../../components/ui';
import type { NamedPlace } from '../../domain';
import { COLORS, SPACE, TYPE } from '../../theme';
import { CoordinatesPanel } from './components/CoordinatesPanel';
import { PlaceSearchPanel } from './components/PlaceSearchPanel';
import { placeFromCoordinates } from './coordinates';
import { MapPicker } from './map/MapPicker';

type PickerMode = 'search' | 'map' | 'coords';

const MODES: readonly SegmentOption<PickerMode>[] = [
  { value: 'search', label: 'Nazwa' },
  { value: 'map', label: 'Mapa' },
  { value: 'coords', label: 'GPS' },
];

interface LocationPickerProps {
  readonly onSelect: (place: NamedPlace) => void;
}

export function LocationPicker({ onSelect }: LocationPickerProps) {
  const [mode, setMode] = useState<PickerMode>('search');
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <SurfaceCard variant="elevated" style={styles.card}>
      <SegmentedControl options={MODES} value={mode} onChange={setMode} />

      {mode === 'search' ? <PlaceSearchPanel onSelect={onSelect} /> : null}
      {mode === 'coords' ? <CoordinatesPanel onSelect={onSelect} /> : null}
      {mode === 'map' ? (
        <View style={styles.mapTab}>
          <Text style={styles.mapHint}>Wskaż dokładny las lub polanę na mapie OpenStreetMap.</Text>
          <Button label="Otwórz mapę" icon="map-outline" onPress={() => setMapOpen(true)} />
        </View>
      ) : null}

      <Text style={styles.footnote}>
        Model pogodowy ma siatkę kilku kilometrów — lasy bliżej niż ok. 10 km dadzą zbliżony wynik.
      </Text>

      <MapPicker
        visible={mapOpen}
        initialCoords={null}
        onCancel={() => setMapOpen(false)}
        onConfirm={(coords) => {
          setMapOpen(false);
          onSelect(placeFromCoordinates(coords, 'punkt z mapy'));
        }}
      />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: SPACE.l },
  mapTab: { gap: SPACE.m },
  mapHint: { ...TYPE.subhead, color: COLORS.textMuted },
  footnote: { ...TYPE.caption, color: COLORS.textSubtle },
});