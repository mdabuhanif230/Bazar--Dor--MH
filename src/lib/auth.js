import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getMongoClient } from "./mongodb";

let auth;

export function getAuth() {
  if (auth) {
    return auth;
  }

  const secret = process.env.BETTER_AUTH_SECRET;
  const url = process.env.BETTER_AUTH_URL;

  if (!secret || secret.length < 32 || secret.startsWith("REPLACE_")) {
    throw new Error("BETTER_AUTH_SECRET সঠিকভাবে দিন।");
  }

  if (!url) {
    throw new Error("BETTER_AUTH_URL দিন।");
  }

  const client = getMongoClient();
  const providers = {};

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.github = {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  auth = betterAuth({
    appName: "BazarDor",
    baseURL: url,
    secret: secret,
    trustedOrigins: [url],

    database: mongodbAdapter(
      client.db(process.env.MONGODB_DB || "bazar_dor"),
      { client }
    ),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: false,
      minPasswordLength: 8,
    },

    socialProviders: providers,
  });

  return auth;
}