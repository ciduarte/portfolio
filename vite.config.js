import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "/",
});
