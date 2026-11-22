/**
 * @file Ciemny pasek stanu na czas widoczności ekranu z jasnym tłem i bez zielonego nagłówka
 * (Atlas, Klucz). Po wyjściu – z powrotem jasny (pozostałe ekrany mają zielony nagłówek).
 */
import { useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';

export function useDarkStatusBar(): void {
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle('dark');
      return () => setStatusBarStyle('light');
    }, []),
  );
}
