import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 75 es la calidad por defecto (capturas). 90 es para la foto del hero: a 75 se notaba en la barba y el pelo.
    qualities: [75, 90],
  },
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
