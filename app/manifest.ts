import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "3DBox Studio - Create Studio 2025",
    short_name: "3DBox Studio",
    description:
      "Aplicación profesional para crear portadas de cajas 3D, iconos y plantillas de correo - Create Studio 2025",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#39ff14",
    orientation: "portrait",
    icons: [
      {
        src: "/logo-create-studio.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any maskable",
      },
      {
        src: "/logo-create-studio.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any maskable",
      },
    ],
    categories: ["design", "graphics", "productivity"],
    screenshots: [
      {
        src: "/logo-create-studio.webp",
        sizes: "1280x720",
        type: "image/webp",
        form_factor: "wide",
      },
    ],
  }
}
