const mockGetForegroundPermissionsAsync = jest.fn();
const mockRequestForegroundPermissionsAsync = jest.fn();
const mockHasServicesEnabledAsync = jest.fn();
const mockGetCurrentPositionAsync = jest.fn();
const mockGetLastKnownPositionAsync = jest.fn();

jest.mock('expo-location', () => ({
  Accuracy: { Balanced: 3 },
  getForegroundPermissionsAsync: () => mockGetForegroundPermissionsAsync(),
  requestForegroundPermissionsAsync: () => mockRequestForegroundPermissionsAsync(),
  hasServicesEnabledAsync: () => mockHasServicesEnabledAsync(),
  getCurrentPositionAsync: (opts: unknown) => mockGetCurrentPositionAsync(opts),
  getLastKnownPositionAsync: (opts: unknown) => mockGetLastKnownPositionAsync(opts),
}));

import { resolveLocation } from '../locationService';

describe('locationService', () => {
  beforeEach(() => {
    mockGetForegroundPermissionsAsync.mockReset().mockResolvedValue({ granted: true, canAskAgain: true });
    mockRequestForegroundPermissionsAsync.mockReset();
    mockHasServicesEnabledAsync.mockReset().mockResolvedValue(true);
    mockGetCurrentPositionAsync.mockReset();
    mockGetLastKnownPositionAsync.mockReset().mockResolvedValue(null);
  });

  it('nie powoduje unhandledRejection, gdy getCurrentPositionAsync odrzuci się po przekroczeniu timeoutu', async () => {
    let rejectFix!: (reason?: unknown) => void;
    mockGetCurrentPositionAsync.mockImplementation(
      () =>
        new Promise((_resolve, reject) => {
          rejectFix = reject;
        }),
    );

    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on('unhandledRejection', onUnhandled);

    try {
      const result = await resolveLocation({ timeoutMs: 5 });
      expect(result.status).toBe('error');

      rejectFix(new Error('GPS disabled after timeout'));
      await new Promise((r) => setTimeout(r, 10));
      expect(unhandled).toEqual([]);
    } finally {
      process.off('unhandledRejection', onUnhandled);
    }
  });
});
