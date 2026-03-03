import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

const DEV_PAGE_REWRITE = {
  "/blog.html": "/src/pages/blog.html",
  "/blog-post.html": "/src/pages/blog-post.html",
  "/projects.html": "/src/pages/projects.html",
  "/project.html": "/src/pages/project.html",
  "/about.html": "/src/pages/about.html",
  "/contacts.html": "/src/pages/contacts.html",
  "/404.html": "/src/pages/404.html",
};

function devMpaRewrite() {
  return {
    name: "dev-mpa-rewrite",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();

        const [pathname, query = ""] = req.url.split("?");
        const target = DEV_PAGE_REWRITE[pathname];

        if (target) {
          req.url = query ? `${target}?${query}` : target;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(rootDir, "src/partials"),
        resolve(rootDir, "src/pages"),
      ],
    }),

    devMpaRewrite(),
  ],

  build: {
    rollupOptions: {
      input: {
        index: resolve(rootDir, "index.html"),
        blog: resolve(rootDir, "src/pages/blog.html"),
        blogPost: resolve(rootDir, "src/pages/blog-post.html"),
        projects: resolve(rootDir, "src/pages/projects.html"),
        project: resolve(rootDir, "src/pages/project.html"),
        about: resolve(rootDir, "src/pages/about.html"),
        contacts: resolve(rootDir, "src/pages/contacts.html"),
        notFound: resolve(rootDir, "src/pages/404.html"),
      },
    },
  },
});
