jest.mock('../../../assets/db/myco.db', () => 1, { virtual: true });

const mockDownloadAsync = jest.fn();
const mockFromModule = jest.fn((_moduleId: unknown) => ({
  localUri: 'file:///tmp/asset/myco.db',
  downloadAsync: mockDownloadAsync,
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: (moduleId: unknown) => mockFromModule(moduleId),
  },
}));

const existingFiles = new Set<string>();
const operations: string[] = [];
let failCopy = false;

class MockDirectory {
  readonly uri: string;
  constructor(...parts: (string | MockDirectory)[]) {
    const base = typeof parts[0] === 'string' ? parts[0] : parts[0]?.uri ?? '';
    const rest = parts.slice(1).map(String).join('/');
    this.uri = `${base.replace(/\/$/, '')}/${rest}/`;
  }
  get exists() {
    return true;
  }
  create() {
    operations.push(`dir.create:${this.uri}`);
  }
}

class MockFile {
  uri: string;
  constructor(...parts: (string | MockDirectory | MockFile)[]) {
    const first = parts[0];
    const base = typeof first === 'string' ? first : first?.uri ?? '';
    const rest = parts.slice(1).map((p) => (typeof p === 'string' ? p : p.uri)).join('/');
    this.uri = rest ? `${base.replace(/\/$/, '')}/${rest}` : base;
  }
  get exists() {
    return existingFiles.has(this.uri);
  }
  get size() {
    return 1024;
  }
  delete() {
    operations.push(`delete:${this.uri}`);
    existingFiles.delete(this.uri);
  }
  async copy(dest: MockFile) {
    operations.push(`copy:${this.uri}->${dest.uri}`);
    if (failCopy) {
      existingFiles.add(dest.uri);
      throw new Error('Brak miejsca na dysku');
    }
    existingFiles.add(dest.uri);
  }
  async move(dest: MockFile) {
    operations.push(`move:${this.uri}->${dest.uri}`);
    existingFiles.delete(this.uri);
    existingFiles.add(dest.uri);
    this.uri = dest.uri;
  }
}

jest.mock('expo-file-system', () => ({
  Directory: MockDirectory,
  File: MockFile,
  Paths: {
    document: 'file:///var/mobile/Application%20Support/My%20App/',
  },
}));

const mockOpenDatabaseSync = jest.fn();
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: (name: string, options?: unknown, directory?: string) =>
    mockOpenDatabaseSync(name, options, directory),
}));

describe('db/client', () => {
  beforeEach(() => {
    jest.resetModules();
    existingFiles.clear();
    operations.length = 0;
    failCopy = false;
    mockDownloadAsync.mockReset().mockResolvedValue(undefined);
    mockOpenDatabaseSync.mockReset();
  });

  it('przekazuje pełne file:// URI katalogu SQLite i kopiuje bazę atomowo przez plik tymczasowy', async () => {
    const dbUri = 'file:///var/mobile/Application%20Support/My%20App/SQLite/myco.db';
    const walUri = `${dbUri}-wal`;
    const tmpUri = `${dbUri}.tmp`;
    existingFiles.add(dbUri);
    existingFiles.add(walUri);

    const mockDb = {
      getFirstSync: jest
        .fn()
        .mockReturnValueOnce({ value: '1:old' })
        .mockReturnValueOnce({ name: 'species' }),
      closeSync: jest.fn(),
      execSync: jest.fn(),
    };
    mockOpenDatabaseSync.mockReturnValue(mockDb);

    const { initDatabase } = require('../client');
    await initDatabase();

    expect(mockOpenDatabaseSync).toHaveBeenCalledWith(
      'myco.db',
      undefined,
      'file:///var/mobile/Application%20Support/My%20App/SQLite',
    );
    expect(operations).toEqual([
      `copy:file:///tmp/asset/myco.db->${tmpUri}`,
      `delete:${dbUri}`,
      `delete:${walUri}`,
      `move:${tmpUri}->${dbUri}`,
    ]);
    expect(existingFiles.has(dbUri)).toBe(true);
    expect(existingFiles.has(tmpUri)).toBe(false);
  });

  it('nie usuwa istniejącej bazy, gdy pobieranie lub kopiowanie zawiedzie', async () => {
    const dbUri = 'file:///var/mobile/Application%20Support/My%20App/SQLite/myco.db';
    const tmpUri = `${dbUri}.tmp`;
    existingFiles.add(dbUri);
    failCopy = true;

    const mockDb = {
      getFirstSync: jest.fn().mockReturnValueOnce({ value: '1:old' }),
      closeSync: jest.fn(),
    };
    mockOpenDatabaseSync.mockReturnValue(mockDb);

    const { initDatabase } = require('../client');
    await expect(initDatabase()).rejects.toThrow('Brak miejsca na dysku');

    expect(existingFiles.has(dbUri)).toBe(true);
    expect(existingFiles.has(tmpUri)).toBe(false);
    expect(operations).not.toContain(`delete:${dbUri}`);
  });
});
