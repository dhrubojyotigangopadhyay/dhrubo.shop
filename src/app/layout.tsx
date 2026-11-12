import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { Analytics, CONSENT_DEFAULT } from "@/components/site/Analytics";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
import { THEME_BOOTSTRAP } from "@/components/site/ThemeToggle";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { graph, personJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  display: "swap",
});

// Poster face for the homepage film and case-study titles. SIL OFL 1.1.
const poster = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-poster",
  weight: ["700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: "dhrubo.shop",
  authors: [{ name: "Dhrubojyoti Gangopadhyay", url: `${SITE_URL}/about` }],
  creator: "Dhrubojyoti Gangopadhyay",
  publisher: "Dhrubojyoti Gangopadhyay",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: "Dhrubojyoti Gangopadhyay, Forward Deployed & Applied AI Engineer" }],
  },
  twitter: { card: "summary_large_image", creator: "@DhruboZ4U", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [`${SITE_URL}/og`] },
  icons: { icon: "/icon", apple: "/apple-icon" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${poster.variable}`}>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive" nonce={nonce}>
          {THEME_BOOTSTRAP}
        </Script>
        <Script id="ga-consent-default" strategy="beforeInteractive" nonce={nonce}>
          {CONSENT_DEFAULT}
        </Script>
        <JsonLd data={graph(personJsonLd(), websiteJsonLd())} nonce={nonce} />
      </head>
      <body className="min-h-dvh bg-bg text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AssistantWidget />
        <Analytics nonce={nonce} />
      </body>
    </html>
  );
}
