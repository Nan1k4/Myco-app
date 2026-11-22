import { useMemo, useState } from 'react';
import { ActivityIndicator, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { APP_USER_AGENT } from '../../../appInfo';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons/Icon';
import { StatusBanner } from '../../../components/ui';
import type { GeoCoordinates } from '../../../domain';
import { COLORS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { formatCoordinates } from '../coordinates';
import { PLACE_ZOOM, POLAND_VIEWPORT, buildMapPage, classifyNavigation, parseMapMessage } from './mapPage';

interface MapPickerProps {
  readonly visible: boolean;
  readonly initialCoords: GeoCoordinates | null;
  readonly onCancel: () => void;
  readonly onConfirm: (coords: GeoCoordinates) => void;
}

export function MapPicker({ visible, initialCoords, onCancel, onConfirm }: MapPickerProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      {visible ? (
        <GestureHandlerRootView style={styles.screen}>
          <MapPickerContent initialCoords={initialCoords} onCancel={onCancel} onConfirm={onConfirm} />
        </GestureHandlerRootView>
      ) : null}
    </Modal>
  );
}

type LoadState = 'loading' | 'ready' | 'leaflet_error';

const ERROR_TEXT = {
  leaflet_error: 'Nie udało się załadować mapy. Sprawdź połączenie z internetem.',
  tiles: 'Część mapy się nie wczytała. Sprawdź połączenie z internetem.',
} as const;

function MapPickerContent({ initialCoords, onCancel, onConfirm }: Omit<MapPickerProps, 'visible'>) {
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState<GeoCoordinates | null>(initialCoords);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [tilesFailing, setTilesFailing] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const html = useMemo(
    () => buildMapPage(initialCoords ? { center: initialCoords, zoom: PLACE_ZOOM } : POLAND_VIEWPORT, initialCoords),
    [initialCoords],
  );

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = parseMapMessage(event.nativeEvent.data);
    if (!message) return;
    switch (message.type) {
      case 'ready':
        setLoadState('ready');
        return;
      case 'pick':
        setPicked(message.coords);
        return;
      case 'error':
        if (message.reason === 'leaflet') setLoadState('leaflet_error');
        else setTilesFailing(true);
        return;
    }
  };

  const retry = () => {
    setLoadState('loading');
    setTilesFailing(false);
    setAttempt((n) => n + 1);
  };

  const errorText = loadState === 'leaflet_error' ? ERROR_TEXT.leaflet_error : tilesFailing ? ERROR_TEXT.tiles : null;

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + SPACE.xs }]}>
        <Pressable onPress={onCancel} accessibilityRole="button" accessibilityLabel="Anuluj" style={styles.closeBtn}>
          <Icon name="close" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          Wybierz punkt na mapie
        </Text>
        <View style={styles.closeBtn} />
      </View>

      <View style={styles.mapArea}>
        <WebView
          key={attempt}
          source={{ html }}
          originWhitelist={['*']}
          userAgent={APP_USER_AGENT}
          onMessage={handleMessage}
          onShouldStartLoadWithRequest={(request) => {
            const decision = classifyNavigation(request.url);
            if (decision === 'external') void Linking.openURL(request.url);
            return decision === 'allow';
          }}
          setSupportMultipleWindows={false}
          onError={() => setLoadState('leaflet_error')}
          style={styles.map}
        />
        {loadState === 'loading' ? (
          <View style={styles.overlay} pointerEvents="none">
            <ActivityIndicator color={COLORS.primary} size="large" />
          </View>
        ) : null}
      </View>

      <View style={[styles.footer, { paddingBottom: SPACE.l + insets.bottom }]}>
        {errorText ? (
          <StatusBanner tone="warning" message={errorText} action={{ label: 'Spróbuj ponownie', onPress: retry }} />
        ) : null}
        <View style={styles.coordsRow}>
          <Icon name="pin" size={16} color={picked ? COLORS.primary : COLORS.textSubtle} />
          <Text style={styles.status} numberOfLines={1} ellipsizeMode="tail">
            {picked ? formatCoordinates(picked) : 'Dotknij mapy, aby zaznaczyć punkt'}
          </Text>
        </View>
        <Button
          label="Wybierz ten punkt"
          icon="checkmark"
          disabled={!picked}
          onPress={() => {
            if (picked) onConfirm(picked);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderSubtle,
    paddingHorizontal: SPACE.s,
    paddingBottom: SPACE.s,
    gap: SPACE.s,
  },
  closeBtn: { width: MIN_TOUCH, height: MIN_TOUCH, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  headerTitle: { ...TYPE.headline, color: COLORS.text, flex: 1, flexShrink: 1, textAlign: 'center' },
  mapArea: { flex: 1 },
  map: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  footer: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.m,
    paddingBottom: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSubtle,
  },
  coordsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACE.xs },
  status: { ...TYPE.subhead, color: COLORS.text, fontVariant: ['tabular-nums'], flexShrink: 1 },
});