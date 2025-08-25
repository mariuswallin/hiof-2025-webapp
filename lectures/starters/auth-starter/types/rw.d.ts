import type { AppContext } from "@/shared/services";

declare module "rwsdk/worker" {
  interface DefaultAppContext extends AppContext {}
}
