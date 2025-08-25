import { db } from "@/db";

import {
  users,
  accounts,
  sessions,
  verifications,
  type UserStatus,
} from "@/db/schema";
import type { Role } from "@/lib/shared/auth";
import { sendVerificationEmail } from "@/providers/email";
import { betterAuth, type Verification } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
    schema: { users, accounts, sessions, verifications },
  }),
  user: {
    additionalFields: {
      roles: {
        type: "string[]",
        required: true,
        defaultValue: ["user"],
        input: false, // don't allow user to set role
      },
      onboardingCompleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false, // don't allow user to set onboarding status
      },
      agreedToTerms: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false, // don't allow user to set agreement status
      },
      status: {
        type: "string",
        required: true,
        defaultValue: "active",
        input: false, // don't allow user to set status
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // TODO: Set to true in production
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  databaseHooks: {
    before: async () => {
      console.log("Database operation is about to start");
    },
    verification: {
      create: {
        before: async (verification: Verification) => {
          console.log("verification before", verification);
        },
        after: async (verification: Verification) => {
          console.log("verification after", verification);
        },
      },
    },
    user: {
      create: {
        before: async (user) => {
          console.log("user before", user);
        },
        after: async (user) => {
          console.log("user after", user);
        },
      },
    },
  },
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url, token }, request) => {
  //     await sendVerificationEmail(user.email, url);
  //   },
  // },
});

export type User = (typeof auth.$Infer.Session)["user"] & {
  roles: Role[];
  status: UserStatus;
};
export type Session = typeof auth.$Infer.Session & {
  user: User;
};
