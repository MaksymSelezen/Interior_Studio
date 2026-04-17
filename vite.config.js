import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const repoBasePath = "/Interior_Studio/";

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

function isHtmlPageRequest(req) {
  if (!req.url) return false;
  if (req.method !== "GET" && req.method !== "HEAD") return false;

  const acceptHeader = req.headers.accept || "";
  return acceptHeader.includes("text/html");
}

function normalizeBase(basePath) {
  if (!basePath || basePath === "/") return "/";

  const prefixed = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

function createNotFoundRedirectMiddleware(validHtmlRoutes, basePath) {
  const normalizedBase = normalizeBase(basePath);

  return (req, res, next) => {
    if (!isHtmlPageRequest(req)) {
      next();
      return;
    }

    const { pathname } = new URL(req.url, "http://localhost");

    const normalizedPath =
      normalizedBase !== "/" && pathname.startsWith(normalizedBase)
        ? pathname.slice(normalizedBase.length - 1)
        : pathname;

    if (validHtmlRoutes.has(normalizedPath)) {
      next();
      return;
    }

    res.statusCode = 302;
    res.setHeader("Location", `${normalizedBase}404.html`);
    res.end();
  };
}

export default defineConfig(({ command }) => {
  const base = command === "serve" ? "/" : repoBasePath;
  const inputs = getHtmlInputs();
  const validHtmlRoutes = new Set(["/", "/index.html"]);

  Object.keys(inputs).forEach((key) => {
    const route = key === "index" ? "/" : `/${key}.html`;
    validHtmlRoutes.add(route);
  });

  const notFoundRedirectMiddleware = createNotFoundRedirectMiddleware(
    validHtmlRoutes,
    base,
  );

  return {
    base,

    plugins: [
      {
        name: "redirect-invalid-routes-to-404",
        enforce: "pre",
        configureServer(server) {
          server.middlewares.use(notFoundRedirectMiddleware);
        },
        configurePreviewServer(server) {
          server.middlewares.use(notFoundRedirectMiddleware);
        },
      },
      handlebars({
        partialDirectory: resolve(rootDir, "src/html"),

        context: () => ({
          BASE_URL: base,
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
