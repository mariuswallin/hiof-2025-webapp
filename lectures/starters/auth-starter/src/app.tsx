import { defineApp } from "rwsdk/worker";

import { prefix, route } from "rwsdk/router";
import { injectServicesMiddleware } from "@/shared/services";
import { setCommonHeaders } from "./app/headers";

import { auth } from "@/features/auth/lib/auth";
import { authMiddleware } from "./middlewares/global";
import { authRoutes } from "@/features/auth/auth-routes";
import type { DB } from "@/db";

export const makeApp = (database?: DB) => {
  const app = defineApp([
    setCommonHeaders(),
    (context) =>
      injectServicesMiddleware({
        context,
        database,
      }),
    authMiddleware,
    route("/api/auth/*", ({ request }) => {
      return auth.handler(request);
    }),
    prefix("/auth", authRoutes),
  ]);

  return app;
};

const app = makeApp();

export default app;
