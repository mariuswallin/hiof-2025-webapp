import type { RequestInfo } from "rwsdk/worker";
import { env } from "cloudflare:workers";
import { auth } from "@/features/auth/lib";
import type { User } from "@/db/schema";

export const authMiddleware = async (context: RequestInfo) => {
  const { request, ctx } = context;
  ctx.authUrl = env.BETTER_AUTH_URL;

  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session?.user) {
      ctx.user = {
        ...session.user,
        image: session.user.image || null,
      } as User;
    }
  } catch (error) {
    console.error("Session error:", error);
  }
};
