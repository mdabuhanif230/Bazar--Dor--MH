import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getAuth } from "./auth";

export async function requireSession(path) {
  const auth = getAuth();
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session) {
    const nextPath = encodeURIComponent(path);

    redirect(`/signin?reason=protected&next=${nextPath}`);
  }

  return session;
}