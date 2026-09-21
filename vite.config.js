/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
    // Spawning a fresh OS process per test file is unreliable on some
    // machines (worker-startup timeouts); running sequentially in one
    // process trades a bit of speed for consistent, non-flaky runs.
    fileParallelism: false,
    // Full axe scans over larger component trees can legitimately take
    // longer than the 5s default, especially in this environment.
    testTimeout: 15000,
  },
});
