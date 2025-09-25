import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

import { redwood } from "rwsdk/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
