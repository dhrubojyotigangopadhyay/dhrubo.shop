import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhrubo | Forward Deployed & Applied AI Engineer",
    short_name: "Dhrubo",
    description:
      "Dhrubojyoti Gangopadhyay: agentic systems, MCP integration and enterprise workflow automation. Builder of Sahkarmi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f2ea",
    theme_color: "#f6f2ea",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
