import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button } from '../../../components/Button';
import { Icon, type IconName } from '../../../components/icons/Icon';
import { REFLOW } from '../../../components/motion';
import type { SpeciesBasicInfo } from '../../../db/types';
import type { FilterResult, MushroomId } from '../../../domain';
import { FEATURE_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, RADIUS, SPACE, TYPE } from '../../../theme';
import { thresholdToReveal, type QuizKey, type SimilarityEntry } from '../engine';

type Status = FilterResult['status'];

const MAX_NAMED_HIDDEN = 3;

const TONE = {
  clear: { bg: FILLS.neutral, border: COLORS.border, ink: COLORS.text, icon: 'info' },
  no_match: { bg: FILLS.neutral, border: COLORS.border, ink: COLORS.text, icon: 'help' },
  verification_required: {
    bg: COLORS.warningBg,
    border: COLORS.warningBorder,
    ink: COLORS.warningText,
    icon: 'warning',
  },
  dangerous_match: { bg: COLORS.dangerBg, border: COLORS.danger, ink: COLORS.dangerText, icon: 'alert' },
} as const satisfies Record<
  Status,
  { readonly bg: string; readonly border: string; readonly ink: string; readonly icon: IconName }
>;

interface GateBannerProps {
  readonly gate: FilterResult;
  readonly totalSpecies: number;
  readonly threshold: number;
  readonly hiddenDangerous: readonly SimilarityEntry[];
  readonly speciesById: ReadonlyMap<MushroomId, SpeciesBasicInfo>;
  readonly onOpenSpecies: (id: MushroomId) => void;
  readonly onCheck: (key: QuizKey) => void;
  readonly onLowerThreshold: (value: number) => void;
  readonly onRevealDangerous: () => void;
}

export function GateBanner({
  gate,
  totalSpecies,
  threshold,
  hiddenDangerous,
  speciesById,
  onOpenSpecies,
  onCheck,
  onLowerThreshold,
  onRevealDangerous,
}: GateBannerProps) {
  const tone = TONE[gate.status];
  const { title, body } = describe(gate, totalSpecies);
  const hasHiddenDangerous = hiddenDangerous.length > 0;
  const target = hasHiddenDangerous ? thresholdToReveal(hiddenDangerous, threshold) : null;
  const preview = hiddenDangerous.slice(0, MAX_NAMED_HIDDEN);
  const extraCount = hiddenDangerous.length - preview.length;

  return (
    <Animated.View
      layout={REFLOW}
      style={[styles.banner, { backgroundColor: tone.bg, borderColor: tone.border }]}
      accessibilityRole="summary"
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon name={tone.icon} size={22} color={tone.border} />
        </View>
        <View style={styles.text}>
          <Text style={[styles.title, { color: tone.ink }]}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
      </View>

      {hasHiddenDangerous ? (
        <View style={styles.block}>
          <Text style={styles.hiddenNote}>
            {target !== null
              ? 'Obecny próg dopasowania ukrywa część niewykluczonych gatunków trujących. Obniż próg, aby zobaczyć pełną listę ryzyka:'
              : 'Próg 50% nie obejmuje wszystkich niewykluczonych gatunków trujących. Część ma niższe dopasowanie:'}
          </Text>
          <View style={styles.hiddenList}>
            {preview.map((entry) => {
              const name = speciesById.get(entry.species.id)?.polishName ?? entry.species.id;
              const percent = Math.round(entry.score * 100);
              return (
                <Pressable
                  key={entry.species.id}
                  onPress={() => onOpenSpecies(entry.species.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${name}, zgodność ${percent} procent`}
                  style={({ pressed }) => [styles.hiddenItem, pressed && styles.hiddenItemPressed]}
                >
                  <Text style={styles.hiddenItemName} numberOfLines={1} ellipsizeMode="tail">
                    {name}
                  </Text>
                  <Text style={styles.hiddenItemScore}>{percent}%</Text>
                  <Icon name="chevron-forward" size={14} color={COLORS.dangerText} />
                </Pressable>
              );
            })}
            {extraCount > 0 ? <Text style={styles.hiddenNote}>… oraz jeszcze {extraCount}</Text> : null}
          </View>
          {target !== null ? (
            <Button
              label={`Pokaż ukryte — obniż próg do ${Math.round(target * 100)}%`}
              icon="eye-outline"
              variant="danger"
              onPress={() => onLowerThreshold(target)}
            />
          ) : (
            <Button
              label={`Pokaż wszystkie niewykluczone trujące (${hiddenDangerous.length})`}
              icon="eye-outline"
              variant="danger"
              onPress={onRevealDangerous}
            />
          )}
        </View>
      ) : null}

      {gate.status === 'verification_required' ? (
        <Button
          label={`Sprawdź: ${FEATURE_LABELS_PL[gate.pendingChecks[0].feature]}`}
          icon="shield-checkmark-outline"
          variant="filled"
          onPress={() => onCheck(gate.pendingChecks[0].feature)}
        />
      ) : null}
    </Animated.View>
  );
}

function describe(gate: FilterResult, totalSpecies: number): { readonly title: string; readonly body: string } {
  switch (gate.status) {
    case 'clear':
      return {
        title: 'Brak znanych trujących kandydatów',
        body: `Dotyczy tylko ${totalSpecies} gatunków z bazy. To NIE znaczy, że grzyb jest jadalny.`,
      };
    case 'verification_required':
      return {
        title: 'Wymagana weryfikacja bezpieczeństwa',
        body: 'Nie wykluczono jeszcze wszystkich groźnych gatunków. Wykonaj poniższe sprawdzenie, aby bezpiecznie zawęzić wyniki.',
      };
    case 'dangerous_match':
      return {
        title: 'Możliwy gatunek trujący — nie jedz',
        body: 'Żadne dostępne sprawdzenie nie wyklucza gatunków trujących.',
      };
    case 'no_match':
      return {
        title: 'Brak pełnej zgodności z bazą',
        body: 'Grzyba może nie być w bazie. Gatunki poniżej są tylko podobne — to nie rozpoznanie.',
      };
  }
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    padding: SPACE.l,
    gap: SPACE.m,
  },
  row: { flexDirection: 'row', gap: SPACE.m, alignItems: 'flex-start' },
  iconWrap: { paddingTop: 2 },
  text: { flex: 1, flexShrink: 1, gap: SPACE.xs },
  title: { ...TYPE.headline },
  body: { ...TYPE.subhead, color: COLORS.text },
  hiddenNote: { ...TYPE.footnote, color: COLORS.textMuted },
  hiddenList: { gap: SPACE.xs },
  hiddenItem: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.xs,
    borderRadius: RADIUS.s,
    backgroundColor: COLORS.dangerBg,
  },
  hiddenItemPressed: { opacity: 0.78 },
  hiddenItemName: { ...TYPE.footnote, fontWeight: '600', color: COLORS.dangerText, flex: 1, flexShrink: 1 },
  hiddenItemScore: { ...TYPE.caption, fontWeight: '700', color: COLORS.dangerText, fontVariant: ['tabular-nums'] },
  block: {
    gap: SPACE.s,
    paddingTop: SPACE.m,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(92, 64, 0, 0.22)',
  },
});