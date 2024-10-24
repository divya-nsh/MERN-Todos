import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     plugins: [
  //       visualizer({
  //         open: true, // Automatically open the report in the browser
  //         filename: "bundle-report.html", // The name of the report file
  //       }),
  //     ],
  //   },
  // },
});
