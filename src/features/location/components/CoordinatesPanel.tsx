import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { StatusBanner } from '../../../components/ui';
import type { NamedPlace } from '../../../domain';
import { COLORS, FILLS, MIN_TOUCH, RADIUS, SPACE, TYPE } from '../../../theme';
import { looksSwapped, parseCoordinates, placeFromCoordinates } from '../coordinates';

const ERRORS = {
  format: 'Wpisz dwie liczby: szerokość i długość, np. 52.2297, 21.0122.',
  range: 'Szerokość musi być w zakresie -90…90, a długość -180…180.',
} as const;

interface CoordinatesPanelProps {
  readonly onSelect: (place: NamedPlace) => void;
}

export function CoordinatesPanel({ onSelect }: CoordinatesPanelProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [swapCandidate, setSwapCandidate] = useState<NamedPlace | null>(null);

  const submit = () => {
    setSwapCandidate(null);
    const parsed = parseCoordinates(text);
    if (!parsed.ok) {
      setError(ERRORS[parsed.reason]);
      return;
    }
    if (looksSwapped(parsed.coords)) {
      const { latitude, longitude } = parsed.coords;
      setError('Kolejność wygląda na odwróconą: dla Polski szerokość (49-55) podaje się jako pierwszą.');
      setSwapCandidate(placeFromCoordinates({ latitude: longitude, longitude: latitude }, 'współrzędne'));
      return;
    }
    setError(null);
    onSelect(placeFromCoordinates(parsed.coords, 'współrzędne'));
  };

  return (
    <View style={styles.root}>
      <Text style={styles.hint}>Format WGS84 z mapy turystycznej lub GPS: szerokość, długość.</Text>
      <TextInput
        value={text}
        onChangeText={(value) => {
          setText(value);
          setError(null);
          setSwapCandidate(null);
        }}
        onSubmitEditing={submit}
        placeholder="52.2297, 21.0122"
        placeholderTextColor={COLORS.textSubtle}
        keyboardType="numbers-and-punctuation"
        autoCorrect={false}
        style={styles.input}
      />
      <Button label="Użyj współrzędnych" icon="navigate-outline" onPress={submit} />
      {error ? (
        <StatusBanner
          tone={swapCandidate ? 'warning' : 'danger'}
          message={error}
          action={swapCandidate ? { label: `Zamień i użyj ${swapCandidate.name}`, onPress: () => onSelect(swapCandidate) } : undefined}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.m },
  hint: { ...TYPE.footnote, color: COLORS.textMuted },
  input: {
    ...TYPE.body,
    minHeight: MIN_TOUCH,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.m,
    backgroundColor: FILLS.neutral,
    color: COLORS.text,
  },
});