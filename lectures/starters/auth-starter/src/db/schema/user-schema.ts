import type { Role } from "@/lib/shared/auth";
import { createId } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { exhibitionTable } from "./exhibition-schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userStatuses = [
  "active",
  "onboarding",
  "inactive",
  "invited",
  "blocked",
] as const;

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  roles: text("roles", { mode: "json" })
    .notNull()
    .$type<Role[]>()
    .default(sql`'[]'`),
  status: text({
    enum: userStatuses,
  })
    .notNull()
    .default("active"),
  onboardingCompleted: integer("onboarding_completed", {
    mode: "boolean",
  }).default(false),
  agreedToTerms: integer("agreed_to_terms", {
    mode: "boolean",
  }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  exhibitions: many(exhibitionTable),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type NewUser = typeof users.$inferInsert;
export type UserStatus = (typeof userStatuses)[number];
export type User = typeof users.$inferSelect;
