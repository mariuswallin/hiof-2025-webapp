// src/db/index.ts
"use server";

import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

let dbInstance: DrizzleD1Database<typeof schema> | null = null;

// ! TODO: WIP

async function getWorkerEnv(): Promise<D1Database> {
  try {
    const { env } = await import("cloudflare:workers");

    if (!env || !env.DB) {
      throw new Error("D1 database instance not found in worker environment");
    }
    return env.DB as D1Database;
  } catch (error) {
    throw new Error(
      "Failed to get D1 database instance from worker environment"
    );
  }
}

// Factory function that accepts a D1 database instance
export function createDatabase(
  d1Database: D1Database
): DrizzleD1Database<typeof schema> {
  if (!d1Database) {
    throw new Error("D1 database instance is required");
  }
  return drizzle(d1Database, { schema });
}

// Setup database with provided D1 instance
export function setupDb(d1Database: D1Database) {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = createDatabase(d1Database);
  return dbInstance;
}

export async function getDb(): Promise<DrizzleD1Database<typeof schema>> {
  if (!dbInstance) {
    dbInstance = createDatabase(await getWorkerEnv());
  }
  return dbInstance;
}

export type DB = DrizzleD1Database<typeof schema>;
