import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const REEF_RPC_PROXY_TARGET = "https://eth.reef-node-reefdevcluster-808c46-72-60-35-83.nip.io";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    allowedHosts: true,
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api/reef-rpc': {
        target: REEF_RPC_PROXY_TARGET,
        changeOrigin: true,
      },
      '/api/gateio': {
        target: 'https://api.gateio.ws',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gateio/, ''),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
