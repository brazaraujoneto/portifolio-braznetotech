import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// ... (mantenha as funções de Manus Debug Collector iguais, elas não afetam o build de produção)

const plugins = [react(), tailwindcss(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      // Ajuste fino nos aliases para garantir que o Vite encontre os arquivos
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // Mudamos para 'dist' direto para facilitar a vida da Vercel
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});