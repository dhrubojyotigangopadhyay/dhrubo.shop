import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Dhrubo | Production AI Agent Systems Builder",
  description: "Dhrubojyoti Gangopadhyay builds production AI agents, advanced RAG systems, MCP tooling, voice pipelines, and enterprise AI infrastructure.",
  metadataBase: new URL("https://dhrubo.shop"),
  openGraph: {
    title: "Dhrubo | Production AI Agent Systems Builder",
    description: "31 public AI systems. Advanced RAG, MCP, LangGraph, voice AI, compliance intelligence, and enterprise ops depth.",
    url: "https://dhrubo.shop",
    siteName: "Dhrubo",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
