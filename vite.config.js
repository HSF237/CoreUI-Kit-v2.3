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
    // Spawning a fresh OS process per test file is unreliable on this
    // machine (worker-startup timeouts even with fileParallelism off,
    // since that still spawns one fork per file, just sequentially).
    // A single persistent thread avoids process-spawn overhead entirely.
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    // Full axe scans over larger component trees can legitimately take
    // longer than the 5s default, especially in this environment.
    testTimeout: 15000,
  },
});
