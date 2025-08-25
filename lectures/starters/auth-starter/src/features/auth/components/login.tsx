import { AppContext } from "@/app";
import { LoginForm } from "./login-form";

export function Login({ ctx }: { ctx: AppContext }) {
  const { authUrl } = ctx;

  console.log("authUrl", authUrl);

  return <LoginForm authUrl={authUrl} />;
}
