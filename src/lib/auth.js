import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { getMongoClient } from "./mongodb";

let instance;

export function getAuth() {
  if (instance) {
    return instance;
  }

  const secret = process.env.BETTER_AUTH_SECRET;
  const baseURL = process.env.BETTER_AUTH_URL;

  if (
    !secret ||
    secret.length < 32 ||
    secret.startsWith("REPLACE_")
  ) {
    throw new Error(
      "Set a random BETTER_AUTH_SECRET of at least 32 characters."
    );
  }

  if (!baseURL) {
    throw new Error(
      "BETTER_AUTH_URL environment variable is missing."
    );
  }

  const client = getMongoClient();

  const databaseName = process.env.MONGODB_DB || "bazar_dor";

  const socialProviders = {};

  if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
  ) {
    socialProviders.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  if (
    process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
  ) {
    socialProviders.github = {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  instance = betterAuth({
    appName: "BazarDor",

    baseURL,
    secret,

    trustedOrigins: [baseURL],

    database: mongodbAdapter(
      client.db(databaseName),
      { client }
    ),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: false,
      minPasswordLength: 8,
    },

    socialProviders,
  });

  return instance;
}