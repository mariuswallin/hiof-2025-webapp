import { defineConfig } from "vite";

import { redwood } from "rwsdk/vite";
import path from "node:path";

export default defineConfig({
  plugins: [redwood()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
