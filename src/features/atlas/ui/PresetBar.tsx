import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons/Icon';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { ATLAS_COPY_PL } from '../copy.pl';
import { MAX_PRESET_NAME_LENGTH, MAX_PRESETS, validatePresetName, type AtlasPreset, type PresetNameError } from '../engine';
import { FieldError } from '../../../components/ui';

interface PresetBarProps {
  readonly presets: readonly AtlasPreset[];
  readonly canSave: boolean;
  readonly onApply: (id: string) => void;
  readonly onSave: (name: string) => void;
  readonly onDelete: (id: string) => void;
}

const ERRORS: Readonly<Record<PresetNameError, string>> = {
  empty: ATLAS_COPY_PL.presetEmptyName,
  too_long: `Najwyżej ${MAX_PRESET_NAME_LENGTH} znaki.`,
  duplicate: ATLAS_COPY_PL.presetDuplicate,
  limit: `${ATLAS_COPY_PL.presetLimit}: ${MAX_PRESETS}. Usuń któryś (przytrzymaj).`,
};

export function PresetBar({ presets, canSave, onApply, onSave, onDelete }: PresetBarProps) {
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const problem = validatePresetName(name, presets);
    if (problem) {
      setError(ERRORS[problem]);
      return;
    }
    onSave(name.trim());
    setNaming(false);
    setName('');
    setError(null);
  };

  const cancel = () => {
    setNaming(false);
    setName('');
    setError(null);
  };

  const confirmDelete = (preset: AtlasPreset) =>
    Alert.alert('Usunąć zapisane filtry?', `„${preset.name}”`, [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => onDelete(preset.id) },
    ]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{ATLAS_COPY_PL.presetsTitle}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {presets.map((preset) => (
          <Pressable
            key={preset.id}
            onPress={() => onApply(preset.id)}
            onLongPress={() => confirmDelete(preset)}
            accessibilityRole="button"
            accessibilityHint="Przytrzymaj, aby usunąć"
            style={({ pressed }) => [styles.preset, pressed && styles.pressed]}
          >
            <Icon name="bookmark" size={14} color={COLORS.primary} />
            <Text style={styles.presetText} numberOfLines={1}>
              {preset.name}
            </Text>
          </Pressable>
        ))}
        {canSave && !naming ? (
          <Pressable onPress={() => setNaming(true)} accessibilityRole="button" style={[styles.preset, styles.add]}>
            <Icon name="plus" size={16} color={COLORS.primary} />
            <Text style={styles.presetText} numberOfLines={1}>
              {ATLAS_COPY_PL.presetSave}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
      {naming ? (
        <View style={styles.form}>
          <TextInput
            value={name}
            onChangeText={(value) => {
              setName(value);
              setError(null);
            }}
            onSubmitEditing={save}
            placeholder={ATLAS_COPY_PL.presetNamePlaceholder}
            placeholderTextColor={COLORS.textSubtle}
            maxLength={MAX_PRESET_NAME_LENGTH}
            autoFocus
            returnKeyType="done"
            style={[styles.input, error && styles.inputError]}
          />
          <FieldError message={error} />
          <Button label="Zapisz" onPress={save} />
          <Button label="Anuluj" variant="plain" onPress={cancel} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.s, paddingHorizontal: SPACE.l },
  title: { ...TYPE.footnote, fontWeight: '600', color: COLORS.textMuted },
  row: { gap: SPACE.s },
  preset: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.primary,
  },
  add: { backgroundColor: FILLS.neutral },
  pressed: { opacity: 0.65 },
  presetText: { ...TYPE.subhead, color: COLORS.primary, fontWeight: '600' },
  form: { gap: SPACE.s },
  input: {
    ...TYPE.body,
    color: COLORS.text,
    backgroundColor: FILLS.neutral,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.m,
    minHeight: MIN_TOUCH,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
});