import { createAuthClient } from "better-auth/react";

import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const setupAuthClient = (baseUrl: string) =>
  createAuthClient({
    baseURL: baseUrl,
    plugins: [inferAdditionalFields<typeof auth>()],
  });
