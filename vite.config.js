import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],
      manifest: false, // we are using /public/manifest.json
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/offline.html",
        runtimeCaching: [
          // Cache core GitHub repo endpoints with a NetworkFirst strategy
          {
            urlPattern:
              /^https:\/\/api\.github\.com\/repos\/.*\/(languages|contributors|stats\/commit_activity).*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "github-api",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
            },
          },
          // Your local AI endpoint
          {
            urlPattern: /^http:\/\/localhost:5000\/api\/generate$/i,
            handler: "NetworkFirst",
            options: { cacheName: "ai-api", networkTimeoutSeconds: 3 },
          },
        ],
      },
    }),
  ],
  server: { port: 5174 },
  define: { "process.env": process.env },
});
