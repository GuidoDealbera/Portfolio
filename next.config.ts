import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // El layout raíz vive en app/[lang]: sin esto, las URLs sin ruta responden con el 404 por defecto de Next.
    // Es experimental; next está fijado en 16.4.0, así que no cambia sin que lo decidamos.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
