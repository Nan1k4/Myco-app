import { StyleSheet, Text } from 'react-native';
import { Button } from '../../../components/Button';
import type { ObservationCertainty, ObservationProcedure } from '../../../domain';
import { PROCEDURE_LABELS_PL } from '../../../i18n/pl';
import { COLORS, SPACE, TYPE } from '../../../theme';
import { BottomPanel } from './BottomPanel';

interface CertaintyStepProps {
  readonly procedures: readonly ObservationProcedure[];
  readonly onAnswer: (certainty: ObservationCertainty) => void;
}

export function CertaintyStep({ procedures, onAnswer }: CertaintyStepProps) {
  const done = procedures.map((procedure) => PROCEDURE_LABELS_PL[procedure]).join(' + ');
  return (
    <BottomPanel>
      <Text style={styles.title}>Jak to sprawdziłeś?</Text>
      <Text style={styles.caption}>Gatunek trujący wyklucza wyłącznie odpowiedź po wykonaniu czynności.</Text>
      <Button label={`Wykonałem: ${done}`} icon="checkmark-circle-outline" onPress={() => onAnswer('certain')} />
      <Button label="Tylko na oko" icon="eye-outline" variant="tinted" onPress={() => onAnswer('uncertain')} />
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  title: { ...TYPE.headline, color: COLORS.text },
  caption: { ...TYPE.footnote, color: COLORS.textMuted, marginBottom: SPACE.xs },
});