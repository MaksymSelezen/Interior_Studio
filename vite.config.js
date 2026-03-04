import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

function getHtmlInputs() {
  const inputs = {};

  inputs.index = resolve(rootDir, "index.html");

  const notFoundPath = resolve(rootDir, "404.html");
  if (existsSync(notFoundPath)) {
    inputs["404"] = notFoundPath;
  }

  const pagesDir = resolve(rootDir, "pages");
  if (existsSync(pagesDir)) {
    const files = readdirSync(pagesDir);
    for (const file of files) {
      if (!file.endsWith(".html")) continue;

      const name = file.replace(/\.html$/i, "");
      inputs[`pages/${name}`] = resolve(pagesDir, file);
    }
  }

  return inputs;
}

export default defineConfig(() => {
  const inputs = getHtmlInputs();

  return {
    plugins: [
      handlebars({
        partialDirectory: resolve(rootDir, "src/html"),

        context: () => ({
          BASE_URL: "/",
        }),
      }),
    ],

    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },

    build: {
      rollupOptions: {
        input: inputs,
      },
    },
  };
});
