import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dhrubo | Production AI Systems Builder",
    template: "%s | Dhrubo",
  },
  description: "Dhrubojyoti Gangopadhyay builds production AI agents, retrieval systems, voice workflows, and operational intelligence for complex businesses.",
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
    "Dhrubo AI builder India",
    "India AI agent builder",
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
    title: "Dhrubo | Enterprise instincts. AI systems that ship.",
    description: "Production AI systems built with 17 years of enterprise operating context. Explore 31 public systems across agents, RAG, voice, compliance, and automation.",
    url: "https://dhrubo.shop",
    siteName: "Dhrubo",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dhrubojyoti Gangopadhyay, AI agent systems builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhrubo | Enterprise instincts. AI systems that ship.",
    description: "Production AI agents, retrieval systems, voice workflows, and operational intelligence for complex businesses.",
    creator: "@aibabahq",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/dhrubo-logo.gif",
    apple: "/dhrubo-portrait.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
