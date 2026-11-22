import { useFocusEffect } from 'expo-router';
import { useCallback, useDeferredValue, useMemo, useReducer } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TRANSITIONS } from '../../components/motion';
import { loadQuizIndexBundle } from '../../db/repositories/speciesRepository';
import { COLORS } from '../../theme';
import {
  INITIAL_QUIZ_STATE,
  evaluateFilter,
  nextQuestion,
  quizReducer,
  rankBySimilarity,
  visibleSpecies,
} from './engine';
import { QuestionView } from './ui/QuestionView';
import { QuizHeader } from './ui/QuizHeader';
import { ResultsView } from './ui/ResultsView';
import { SafetyIntro } from './ui/SafetyIntro';

export function QuizScreen() {
  const { filterIndex, speciesById } = useMemo(() => loadQuizIndexBundle(), []);
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const { selections, skipped, skippedStages, reopened, answeredIn, pinned, phase, history, direction } = state;
  const threshold = useDeferredValue(state.threshold);

  const gate = useMemo(() => evaluateFilter(filterIndex, selections), [filterIndex, selections]);
  const ranking = useMemo(
    () => rankBySimilarity(filterIndex.species, selections, threshold),
    [filterIndex, selections, threshold],
  );
  const question = useMemo(
    () => nextQuestion({ gate, ranking, progress: { selections, skipped, skippedStages, reopened, answeredIn }, pinned }),
    [gate, ranking, selections, skipped, skippedStages, reopened, answeredIn, pinned],
  );
  const pool = useMemo(() => visibleSpecies(ranking), [ranking]);

  const undo = useCallback(() => dispatch({ type: 'undo' }), []);
  useHardwareBack(phase !== 'intro' && history.length > 0, undo);

  const confirmReset = useCallback(() => {
    Alert.alert('Zacząć od nowa?', 'Wszystkie dotychczasowe odpowiedzi zostaną wyczyszczone.', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Zacznij od nowa', style: 'destructive', onPress: () => dispatch({ type: 'reset' }) },
    ]);
  }, []);

  if (phase === 'intro') return <SafetyIntro onStart={() => dispatch({ type: 'start' })} />;

  const current = phase === 'results' ? null : question;
  const transition = TRANSITIONS[direction];

  return (
    <View style={styles.screen}>
      <QuizHeader
        canUndo={history.length > 0}
        onUndo={undo}
        canReset={history.length > 0}
        onReset={confirmReset}
        candidateCount={pool.length}
        action={current ? { label: 'Wyniki', onPress: () => dispatch({ type: 'show_results' }) } : null}
      />
      <View style={styles.body}>
        <Animated.View
          key={current?.key ?? 'results'}
          entering={transition.in}
          exiting={transition.out}
          needsOffscreenAlphaCompositing
          style={StyleSheet.absoluteFill}
        >
          {current ? (
            <QuestionView question={current} state={state} pool={pool} dispatch={dispatch} />
          ) : (
            <ResultsView
              gate={gate}
              ranking={ranking}
              speciesById={speciesById}
              progress={state}
              threshold={state.threshold}
              hasMoreQuestions={question !== null}
              dispatch={dispatch}
            />
          )}
        </Animated.View>
      </View>
    </View>
  );
}

function useHardwareBack(enabled: boolean, onBack: () => void): void {
  useFocusEffect(
    useCallback(() => {
      if (!enabled) return undefined;
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        onBack();
        return true;
      });
      return () => subscription.remove();
    }, [enabled, onBack]),
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  body: { flex: 1 },
});