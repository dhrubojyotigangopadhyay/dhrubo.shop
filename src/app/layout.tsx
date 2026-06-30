import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Dhrubojyoti Gangopadhyay | AI Engineer",
  description: "AI Engineer specializing in Advanced RAG & Multi-Agent Systems. Production-first portfolio for Dhrubo.",
  metadataBase: new URL("https://dhrubo.shop"),
  openGraph: {
    title: "Dhrubo | Advanced RAG & Multi-Agent Systems",
    description: "17 years enterprise B2B ops fused with production AI engineering.",
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
