import { Alert, StyleSheet, Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from 'react-native-reanimated';
import { Icon } from '../../../components/icons/Icon';
import { staggeredList } from '../../../components/motion';
import { PressableScale, SurfaceCard } from '../../../components/ui';
import { MAX_SAVED_PLACES, type SavedPlaceId } from '../../../domain';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';
import type { ForecastState } from '../store/forecastStore';
import { forecastStore } from '../store/instance';
import { ForecastRow } from './ForecastRow';

interface SavedPlacesSectionProps {
  readonly state: ForecastState;
  readonly onOpenDetails: (id: SavedPlaceId) => void;
}

export function SavedPlacesSection({ state, onOpenDetails }: SavedPlacesSectionProps) {
  const confirmDelete = (id: SavedPlaceId, name: string) => {
    Alert.alert('Usunąć miejsce?', `„${name}” zniknie z listy zapisanych.`, [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => forecastStore.removePlace(id) },
    ]);
  };

  if (state.places.length === 0) {
    return (
      <SurfaceCard variant="muted" style={styles.empty}>
        <View style={styles.emptyIcon}>
          <Icon name="bookmark" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.emptyTextWrap}>
          <Text style={styles.emptyTitle}>Brak zapisanych lasów</Text>
          <Text style={styles.emptyBody}>
            Wybierz miejsce powyżej i zapisz je — jego indeks wysypu będzie odświeżany automatycznie co godzinę.
          </Text>
        </View>
      </SurfaceCard>
    );
  }

  return (
    <View style={styles.list}>
      {state.places.map((place, index) => (
        <Animated.View key={place.id} entering={staggeredList(index)}>
          <ReanimatedSwipeable
            overshootRight={false}
            containerStyle={styles.swipeContainer}
            renderRightActions={(progress) => (
              <DeleteAction
                progress={progress}
                name={place.name}
                onPress={() => confirmDelete(place.id, place.name)}
              />
            )}
          >
            <ForecastRow
              title={place.name}
              subtitle={place.detail}
              entry={state.entries[place.id]}
              onPress={() => onOpenDetails(place.id)}
            />
          </ReanimatedSwipeable>
        </Animated.View>
      ))}
      <Text style={styles.footer}>
        {state.places.length}/{MAX_SAVED_PLACES} miejsc · odświeżane co godzinę przy otwartej aplikacji
      </Text>
    </View>
  );
}

interface DeleteActionProps {
  readonly progress: SharedValue<number>;
  readonly name: string;
  readonly onPress: () => void;
}

function DeleteAction({ progress, name, onPress }: DeleteActionProps) {
  const reduceMotion = useReducedMotion();

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.2, 1], [0, 0, 1], Extrapolation.CLAMP);
    const scale = reduceMotion
      ? 1
      : interpolate(progress.value, [0, 1], [0.88, 1], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.deleteActionWrap, animatedStyle]}>
      <PressableScale
        onPress={onPress}
        haptic="light"
        accessibilityLabel={`Usuń ${name}`}
        style={styles.deleteAction}
      >
        <Icon name="trash" size={20} color={COLORS.onPrimary} />
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  list: { gap: SPACE.s },
  emptyIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  empty: {
    alignItems: 'center',
    gap: SPACE.m,
  },
  emptyTextWrap: {
    alignItems: 'center',
    gap: SPACE.xs,
  },
  emptyTitle: {
    ...TYPE.headline,
    color: COLORS.text,
    textAlign: 'center',
  },
  emptyBody: {
    ...TYPE.subhead,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  footer: { ...TYPE.caption, color: COLORS.textSubtle, textAlign: 'center', marginTop: SPACE.xs },
  swipeContainer: {
  overflow: 'visible',
  },
  deleteActionWrap: {
    width: 64,
    marginLeft: SPACE.s,
  },
  deleteAction: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
});