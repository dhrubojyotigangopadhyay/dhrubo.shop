import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhrubo | Production AI Agent Systems Builder",
    short_name: "Dhrubo",
    description: "Production AI agents, advanced RAG, MCP tooling, LangGraph orchestration, voice AI, and enterprise AI systems.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#f5f3ee",
    icons: [
      {
        src: "/dhrubo-portrait.jpg",
        sizes: "800x800",
        type: "image/jpeg",
      },
    ],
  };
}
