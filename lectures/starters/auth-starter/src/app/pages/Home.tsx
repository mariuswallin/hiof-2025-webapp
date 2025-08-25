import { RequestInfo } from "rwsdk/worker";

export function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <p>
        {ctx.user?.id
          ? `You are logged in as user ${ctx.user.id}`
          : "You are not logged in"}
      </p>
    </div>
  );
}
