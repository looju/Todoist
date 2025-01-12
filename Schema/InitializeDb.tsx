import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { RxDBMigrationPlugin } from "rxdb/dist/types/plugins/migration-schema";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { Schema } from "./Schema";

addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

export const STORAGE = getRxStorageMemory();
export const collectionName = "DBCollection";
export const dbName = "mainDB";

const isDevelopment = process.env.NODE_ENV !== "production";

const initializeDB = async () => {
  if (isDevelopment) {
    addRxPlugin(RxDBDevModePlugin);
  }
  let db: any;

  try {
    db = await createRxDatabase({
      name: dbName,
      storage: STORAGE,
      multiInstance: false,
      ignoreDuplicate: true,
    });
  } catch (err) {
    console.log("Error creating database", err);
  }

  try {
    await db.addCollections({
      [collectionName]: {
        schema: Schema,
      },
    });
  } catch (error) {
    console.log("Error creating collection", error);
  }
  return db;
};

export default initializeDB;
