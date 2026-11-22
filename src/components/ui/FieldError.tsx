import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACE, TYPE } from '../../theme';
import { Icon } from '../icons/Icon';

interface FieldErrorProps {
  readonly message: string | null;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <View style={styles.row} accessibilityRole="alert" accessibilityLiveRegion="polite">
      <Icon name="alert" size={14} color={COLORS.danger} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACE.xs },
  text: { ...TYPE.footnote, color: COLORS.dangerText, flex: 1, flexShrink: 1 },
});