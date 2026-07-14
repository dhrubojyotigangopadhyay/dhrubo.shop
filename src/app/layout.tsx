import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Dhrubo | Production AI Agent Systems Builder",
    template: "%s | Dhrubo",
  },
  description: "Dhrubojyoti Gangopadhyay builds production AI agents, advanced RAG systems, MCP tooling, voice pipelines, and enterprise AI infrastructure.",
  metadataBase: new URL("https://dhrubo.shop"),
  applicationName: "Dhrubo",
  authors: [{ name: "Dhrubojyoti Gangopadhyay", url: "https://dhrubo.shop" }],
  creator: "Dhrubojyoti Gangopadhyay",
  publisher: "Dhrubo",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "AI engineering portfolio",
  keywords: [
    "Dhrubo",
    "Dhrubojyoti Gangopadhyay",
    "AI agent builder",
    "production AI agents",
    "Advanced RAG engineer",
    "LangGraph engineer",
    "MCP developer",
    "AI Systems Architect",
    "Applied AI Engineer",
    "AI Platform Engineer",
    "Vapi voice AI",
    "enterprise AI automation",
  ],
  openGraph: {
    title: "Dhrubo | Production AI Agent Systems Builder",
    description: "31 public AI systems. Advanced RAG, MCP, LangGraph, voice AI, compliance intelligence, and enterprise ops depth.",
    url: "https://dhrubo.shop",
    siteName: "Dhrubo",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 800,
        alt: "Dhrubojyoti Gangopadhyay, AI agent systems builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhrubo | Production AI Agent Systems Builder",
    description: "Advanced RAG, MCP, LangGraph, voice AI, compliance intelligence, and enterprise AI systems.",
    creator: "@aibabahq",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/dhrubo-logo.gif",
    apple: "/og-image.png",
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
