// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users } from "./schema";
import { auth } from "@/features/auth/lib";

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  // await auth.api.signUpEmail({
  //   body: {
  //     name: "Test user",
  //     password: "testpassword",
  //     email: "test@testuser.io",
  //   },
  // });

  // Verify the insert by selecting all users
  const result = await db.select().from(users).all();

  console.log("🌱 Finished seeding");

  return Response.json(result);
});
