import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    tailwindcss(),
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // Allow external connections (required for Docker)
    port: 5173,
    strictPort: true, // Exit if port is already in use
    hmr: {
      // HMR configuration for Docker
      port: 5173,
      // If you're having issues with HMR, you can try:
      // clientPort: 5173, // Use this if HMR doesn't work
    },
    watch: {
      // Use polling for better file watching in Docker
      usePolling: true,
      interval: 1000, // Check for changes every second
    },
  },
});
