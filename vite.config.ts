import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Force pre-bundling of CommonJS dependencies
  optimizeDeps: {
    include: ["react-social-media-embed"],
    esbuildOptions: {
      // Force ESM output for CommonJS modules
      format: "esm",
    },
  },
  // SSR config to handle CommonJS modules
  ssr: {
    noExternal: ["react-social-media-embed"],
  },
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Handle CommonJS in production build
    commonjsOptions: {
      include: [/react-social-media-embed/, /node_modules/],
      transformMixedEsModules: true,
      esmExternals: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-collapsible",
          ],
          "query-vendor": ["@tanstack/react-query"],
          "embed-vendor": ["react-social-media-embed"],
        },
      },
    },
  },
});
