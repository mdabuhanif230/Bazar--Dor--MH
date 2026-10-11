import { MongoClient } from "mongodb";

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI দেওয়া হয়নি।");
  }

  if (!globalThis.__bazarMongoClient) {
    globalThis.__bazarMongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  return globalThis.__bazarMongoClient;
}