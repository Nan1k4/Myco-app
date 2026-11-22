import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons/Icon';
import { FieldError, PressableScale, StatusBanner, SurfaceCard } from '../../../components/ui';
import { MAX_PLACE_NAME_LENGTH, MAX_SAVED_PLACES, type GeoCoordinates, type NamedPlace } from '../../../domain';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { LocationPicker } from '../../location/LocationPicker';
import { formatCoordinates, isWithinPolandBounds, placeFromCoordinates } from '../../location/coordinates';
import { MapPicker } from '../../location/map/MapPicker';
import { CUSTOM_KEY, sameWeatherCell, type AddPlaceResult, type ForecastState } from '../store/forecastStore';
import { forecastStore } from '../store/instance';
import { ForecastRow } from './ForecastRow';

interface CustomPlaceSectionProps {
  readonly state: ForecastState;
  readonly onOpenDetails: () => void;
}

export function CustomPlaceSection({ state, onOpenDetails }: CustomPlaceSectionProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [refineOpen, setRefineOpen] = useState(false);
  const place = state.customPlace;
  const entry = state.entries[CUSTOM_KEY];

  const check = (selected: NamedPlace) => {
    setPickerOpen(false);
    forecastStore.checkPlace(selected);
  };

  const refine = (coords: GeoCoordinates) => {
    setRefineOpen(false);
    check(placeFromCoordinates(coords, place ? `punkt z mapy · okolice: ${place.name}` : 'punkt z mapy'));
  };

  if (pickerOpen) {
    return (
      <View style={styles.section}>
        <LocationPicker onSelect={check} />
        <Button label="Anuluj wybór" variant="plain" onPress={() => setPickerOpen(false)} />
      </View>
    );
  }

  if (!place) {
    return (
      <PressableScale onPress={() => setPickerOpen(true)} haptic="selection" style={styles.pickTrigger}>
        <View style={styles.pickIcon}>
          <Icon name="map" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.pickText}>
          <Text style={styles.pickTitle} numberOfLines={1} ellipsizeMode="tail">
            Sprawdź inne miejsce
          </Text>
          <Text style={styles.pickHint} numberOfLines={2}>
            Wyszukaj miejscowość, wskaż na mapie lub wpisz GPS
          </Text>
        </View>
        <Icon name="plus" size={20} color={COLORS.primary} />
      </PressableScale>
    );
  }

  const savedTwin = state.places.find((p) => sameWeatherCell(p.coords, place.coords));

  return (
    <View style={styles.section}>
      <ForecastRow
        title={place.name}
        subtitle={place.detail ?? formatCoordinates(place.coords)}
        entry={entry}
        onPress={onOpenDetails}
      />

      {!isWithinPolandBounds(place.coords) ? (
        <StatusBanner tone="warning" message="Punkt leży poza Polską — baza gatunków i progi modelu dotyczą Polski." />
      ) : null}

      <View style={styles.actions}>
        <PressableScale onPress={() => setRefineOpen(true)} haptic="selection" style={styles.actionChip}>
          <Icon name="pin" size={16} color={COLORS.primary} />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">
            Popraw
          </Text>
        </PressableScale>
        <PressableScale onPress={() => setPickerOpen(true)} haptic="selection" style={styles.actionChip}>
          <Icon name="refresh" size={16} color={COLORS.primary} />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">
            Zmień
          </Text>
        </PressableScale>
        <PressableScale
          onPress={() => forecastStore.clearCustomPlace()}
          haptic="selection"
          style={styles.actionChipMuted}
        >
          <Icon name="close" size={16} color={COLORS.textMuted} />
          <Text style={styles.actionTextMuted} numberOfLines={1} ellipsizeMode="tail">
            Zamknij
          </Text>
        </PressableScale>
      </View>

      {savedTwin ? (
        <StatusBanner tone="info" message={`Już na liście zapisanych jako „${savedTwin.name}”.`} />
      ) : entry?.stored ? (
        <SaveForm key={formatCoordinates(place.coords)} place={place} />
      ) : null}

      <MapPicker
        visible={refineOpen}
        initialCoords={place.coords}
        onCancel={() => setRefineOpen(false)}
        onConfirm={refine}
      />
    </View>
  );
}

const SAVE_ERRORS: Record<Exclude<AddPlaceResult, { ok: true }>['reason'], string> = {
  empty_name: 'Nadaj miejscu nazwę.',
  name_too_long: `Nazwa może mieć najwyżej ${MAX_PLACE_NAME_LENGTH} znaków.`,
  duplicate_name: 'Taka nazwa już istnieje.',
  limit: `Możesz zapisać najwyżej ${MAX_SAVED_PLACES} miejsc. Usuń któreś, żeby dodać nowe.`,
  duplicate: 'To miejsce jest już zapisane.',
};

function SaveForm({ place }: { readonly place: NamedPlace }) {
  const [name, setName] = useState(place.name === formatCoordinates(place.coords) ? '' : place.name);
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const result = forecastStore.addPlace(place, name);
    if (!result.ok) setError(SAVE_ERRORS[result.reason]);
  };

  return (
    <SurfaceCard style={styles.saveCard}>
      <Text style={styles.saveLabel}>Zapisz las na liście</Text>
      <View style={styles.saveRow}>
        <TextInput
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError(null);
          }}
          onSubmitEditing={save}
          placeholder="np. Las za stawem"
          placeholderTextColor={COLORS.textSubtle}
          maxLength={MAX_PLACE_NAME_LENGTH}
          returnKeyType="done"
          style={[styles.input, error && styles.inputError]}
        />
        <Button label="Zapisz" onPress={save} />
      </View>
      <FieldError message={error} />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  section: { gap: SPACE.m },
  pickTrigger: {
    minHeight: MIN_TOUCH + 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    padding: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  pickIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pickText: { flex: 1, flexShrink: 1, gap: 2 },
  pickTitle: { ...TYPE.headline, color: COLORS.primary },
  pickHint: { ...TYPE.caption, color: COLORS.textMuted },
  actions: { flexDirection: 'row', gap: SPACE.s },
  actionChip: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.xs,
    paddingHorizontal: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.primary,
  },
  actionChipMuted: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.xs,
    paddingHorizontal: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
  actionText: { ...TYPE.footnote, fontWeight: '700', color: COLORS.primary, flexShrink: 1 },
  actionTextMuted: { ...TYPE.footnote, fontWeight: '600', color: COLORS.textMuted, flexShrink: 1 },
  saveCard: { gap: SPACE.s },
  saveLabel: { ...TYPE.footnote, fontWeight: '700', color: COLORS.textMuted },
  saveRow: { flexDirection: 'row', gap: SPACE.s, alignItems: 'center' },
  input: {
    ...TYPE.body,
    flex: 1,
    flexShrink: 1,
    minHeight: MIN_TOUCH,
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
    color: COLORS.text,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
});