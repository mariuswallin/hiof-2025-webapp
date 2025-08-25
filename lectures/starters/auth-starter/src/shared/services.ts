import { type DB, db } from "@/db";
import type { User } from "@/db/schema";
import type { RequestInfo } from "rwsdk/worker";
import { env } from "cloudflare:workers";

type DevelopmentEnv = "development" | "production" | "test";

export interface Env {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  NODE_ENV: DevelopmentEnv;
  APP_URL: string;
  R2: R2Bucket;
  ASSETS: Fetcher;
  PORT: number;
}

export type ServiceContext = {
  db: DB;
};

export type AppContext = {
  user?: User;
  authUrl?: string;
  services: ServiceContext;
};

export const injectServicesMiddleware = ({
  context,
  database,
}: {
  context: RequestInfo;
  database?: DB;
}) => {
  const { ctx } = context;

  ctx.services = {
    db: database ?? db,
  };
};
