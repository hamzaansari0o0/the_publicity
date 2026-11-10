import "server-only";

import { MongoClient, type Db } from "mongodb";
import type { InquiryDoc, QrLinkDoc, ScanDoc } from "@/lib/models";

/**
 * MongoDB connection (server only).
 *
 * - Credentials come from `.env` (MONGODB_URI / MONGODB_DB) - never hard-code them.
 * - The client is cached on `globalThis` so hot-reloads in dev and warm
 *   serverless invocations reuse one connection pool.
 */

export class DbNotConfiguredError extends Error {
  constructor() {
    super("MONGODB_URI is not set. Add it to your .env file (see .env.example).");
    this.name = "DbNotConfiguredError";
  }
}

const globalForMongo = globalThis as unknown as {
  _publicityMongoClient?: Promise<MongoClient>;
  _publicityMongoIndexes?: Promise<void>;
};

export function isDbConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function connect(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) throw new DbNotConfiguredError();

  if (!globalForMongo._publicityMongoClient) {
    const attempt = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      // Optional fields left `undefined` are omitted instead of stored as null.
      ignoreUndefined: true,
    }).connect();

    // If the first attempt fails, forget it so the next request can retry.
    attempt.catch(() => {
      if (globalForMongo._publicityMongoClient === attempt) {
        globalForMongo._publicityMongoClient = undefined;
      }
    });
    globalForMongo._publicityMongoClient = attempt;
  }
  return globalForMongo._publicityMongoClient;
}

/** Creates the indexes once per server process. Failures are logged, never fatal. */
function ensureIndexes(db: Db): Promise<void> {
  if (!globalForMongo._publicityMongoIndexes) {
    globalForMongo._publicityMongoIndexes = Promise.all([
      db.collection("inquiries").createIndex({ createdAt: -1 }),
      db.collection("qrlinks").createIndex({ slug: 1 }, { unique: true }),
      db.collection("scans").createIndex({ slug: 1, at: -1 }),
    ])
      .then(() => undefined)
      .catch((error: unknown) => {
        console.error("[mongodb] Could not create indexes:", error);
        globalForMongo._publicityMongoIndexes = undefined;
      });
  }
  return globalForMongo._publicityMongoIndexes;
}

export async function getDb(): Promise<Db> {
  const client = await connect();
  const db = client.db(process.env.MONGODB_DB?.trim() || "the_publicity");
  await ensureIndexes(db);
  return db;
}

/** Typed handles for every collection the site uses. */
export async function getCollections() {
  const db = await getDb();
  return {
    inquiries: db.collection<InquiryDoc>("inquiries"),
    qrLinks: db.collection<QrLinkDoc>("qrlinks"),
    scans: db.collection<ScanDoc>("scans"),
  };
}
