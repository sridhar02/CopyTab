import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // Where to output our final build (default is "dist")
    outDir: "dist",

    rollupOptions: {
      // We treat the background script as our main entry.
      // If you have additional scripts (content scripts, popup, etc.),
      // you can add them here too as separate entries.
      input: {
        background: "src/background.js",
      },
      output: {
        // Keep the output file name the same as our manifest references
        entryFileNames: "[name].js",
      },
    },
  },
});
