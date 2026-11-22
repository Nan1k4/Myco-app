import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { StatusBanner } from '../../../components/ui';
import type { NamedPlace } from '../../../domain';
import { COLORS, FILLS, MIN_TOUCH, RADIUS, SPACE, TYPE } from '../../../theme';
import { usePlaceSearch } from '../usePlaceSearch';

interface PlaceSearchPanelProps {
  readonly onSelect: (place: NamedPlace) => void;
}

export function PlaceSearchPanel({ onSelect }: PlaceSearchPanelProps) {
  const [query, setQuery] = useState('');
  const { state, search, reset } = usePlaceSearch();

  const submit = () => search(query);
  const choose = (place: NamedPlace) => {
    reset();
    onSelect(place);
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputWrap}>
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={submit}
          placeholder="np. Kampinos, Puszcza Bialska"
          placeholderTextColor={COLORS.textSubtle}
          returnKeyType="search"
          autoCorrect={false}
          style={styles.input}
        />
        {query.length > 0 ? (
          <Pressable onPress={() => setQuery('')} accessibilityLabel="Wyczyść" hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </Pressable>
        ) : null}
      </View>

      <Button label="Szukaj miejscowości" icon="search-outline" onPress={submit} loading={state.status === 'loading'} />

      {state.status === 'loading' ? <ActivityIndicator color={COLORS.primary} style={styles.loader} /> : null}
      {state.status === 'error' ? <StatusBanner tone="danger" message={state.message} /> : null}

      {state.status === 'success' && state.places.length === 0 ? (
        <StatusBanner
          tone="info"
          message={`Nic nie znaleziono dla „${state.query}”. Wpisz pobliską miejscowość, a potem popraw punkt na mapie.`}
        />
      ) : null}

      {state.status === 'success' && state.places.length > 0 ? (
        <View style={styles.results}>
          {state.places.map((place) => (
            <Pressable
              key={`${place.name}|${place.coords.latitude}|${place.coords.longitude}`}
              onPress={() => choose(place)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.result, pressed && styles.resultPressed]}
            >
              <Ionicons name="location-outline" size={18} color={COLORS.primary} />
              <View style={styles.resultText}>
                <Text style={styles.resultName}>{place.name}</Text>
                {place.detail ? <Text style={styles.resultDetail}>{place.detail}</Text> : null}
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textSubtle} />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.m },
  inputWrap: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.m,
    backgroundColor: FILLS.neutral,
  },
  input: { ...TYPE.body, flex: 1, color: COLORS.text, paddingVertical: 0 },
  loader: { marginVertical: SPACE.s },
  results: { borderRadius: RADIUS.m, overflow: 'hidden', backgroundColor: FILLS.neutral },
  result: {
    minHeight: MIN_TOUCH + 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderSubtle,
  },
  resultPressed: { backgroundColor: FILLS.primary },
  resultText: { flex: 1, gap: 2 },
  resultName: { ...TYPE.headline, color: COLORS.text },
  resultDetail: { ...TYPE.footnote, color: COLORS.textMuted },
});