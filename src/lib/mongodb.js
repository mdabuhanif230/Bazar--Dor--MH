import "server-only";
import { MongoClient } from "mongodb";

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is missing."
    );
  }

  if (!globalThis.__bazarMongoClient) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    globalThis.__bazarMongoClient = client;
  }

  return globalThis.__bazarMongoClient;
}