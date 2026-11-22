import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import { DB_NAME, DB_VERSION_TAG } from './schema';

let dbInstance: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function resolveDbFiles(): {
  readonly dir: Directory;
  readonly sqliteDir: string;
  readonly dbFile: File;
  readonly sidecars: readonly File[];
} {
  const dir = new Directory(Paths.document, 'SQLite');
  const sqliteDir = dir.uri.replace(/^file:\/\//, '').replace(/\/$/, '');
  const dbFile = new File(dir, DB_NAME);
  const sidecars = [new File(dir, `${DB_NAME}-wal`), new File(dir, `${DB_NAME}-shm`)];
  return { dir, sqliteDir, dbFile, sidecars };
}

function readInstalledVersionTag(dbFile: File, sqliteDir: string): string | null {
  if (!dbFile.exists) return null;

  let tempDb: SQLite.SQLiteDatabase | null = null;
  try {
    tempDb = SQLite.openDatabaseSync(DB_NAME, undefined, sqliteDir);
    const row = tempDb.getFirstSync<{ readonly value: string }>(
      `SELECT value FROM db_meta WHERE key = 'version_tag'`,
    );
    return row?.value ?? null;
  } catch {
    return null;
  } finally {
    tempDb?.closeSync();
  }
}

async function copyBundledDatabase(
  dir: Directory,
  dbFile: File,
  sidecars: readonly File[],
): Promise<void> {
  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
  }

  for (const file of [dbFile, ...sidecars]) {
    if (file.exists) {
      file.delete();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const asset = Asset.fromModule(require('../../assets/db/myco.db'));
  await asset.downloadAsync();

  if (!asset.localUri) {
    throw new Error(`Nie udało się pobrać lokalnego zasobu ${DB_NAME}.`);
  }

  new File(asset.localUri).copy(dbFile);
}

async function bootstrapDatabase(): Promise<SQLite.SQLiteDatabase> {
  const { dir, sqliteDir, dbFile, sidecars } = resolveDbFiles();
  const installedVersion = readInstalledVersionTag(dbFile, sqliteDir);

  if (installedVersion !== DB_VERSION_TAG) {
    await copyBundledDatabase(dir, dbFile, sidecars);
  }

  const db = SQLite.openDatabaseSync(DB_NAME, undefined, sqliteDir);
  const tableCheck = db.getFirstSync<{ readonly name: string }>(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'species'`,
  );
  if (!tableCheck) {
    db.closeSync();
    throw new Error(
      `Brak tabeli 'species' w ${DB_NAME} (katalog: ${sqliteDir}, rozmiar: ${String(dbFile.size)} B).`,
    );
  }

  db.execSync('PRAGMA query_only = ON; PRAGMA mmap_size = 30000000;');
  dbInstance = db;
  return db;
}

export function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);
  if (!initPromise) {
    initPromise = bootstrapDatabase().catch((err: unknown) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export function getDb(): SQLite.SQLiteDatabase {
  if (!dbInstance) {
    throw new Error('Baza SQLite nie została zainicjalizowana. Wywołaj initDatabase() w app/_layout.tsx.');
  }
  return dbInstance;
}