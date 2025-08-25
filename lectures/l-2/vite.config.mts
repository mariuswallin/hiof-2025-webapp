import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import { redwood } from "rwsdk/vite";
import path from 'node:path';

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    redwood(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});