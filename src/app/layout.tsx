import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dhrubo | Full-Stack Developer & AI Systems Architect',
    template: '%s | Dhrubo',
  },
  description:
    'Dhrubojyoti Gangopadhyay (Dhrubo) builds production AI agents, retrieval systems, voice workflows, and scalable architectures paired with 17 years of enterprise commercial operations depth.',
  metadataBase: new URL('https://dhrubo.shop'),
  applicationName: 'Dhrubo Portfolio',
  authors: [{ name: 'Dhrubojyoti Gangopadhyay', url: 'https://dhrubo.shop' }],
  creator: 'Dhrubojyoti Gangopadhyay',
  publisher: 'Dhrubo',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  keywords: [
    'Dhrubo',
    'Dhrubojyoti Gangopadhyay',
    'AI Systems Architect',
    'Full-Stack Developer',
    'Production AI Agents',
    'LangGraph Engineer',
    'Model Context Protocol',
    'Vapi Voice AI',
    'Enterprise Operations Leader',
    'Commercial Operations',
    'FastAPI',
    'Supabase',
    'Next.js 15',
  ],
  openGraph: {
    title: 'Dhrubo | Enterprise Instincts. AI Systems That Ship.',
    description:
      'Production AI systems built with 17 years of enterprise commercial operating context. Explore auditable architectures across agents, voice pipelines, and database-tier logic.',
    url: 'https://dhrubo.shop',
    siteName: 'Dhrubo',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhrubojyoti Gangopadhyay, Full-Stack Developer & AI Systems Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhrubo | Enterprise Instincts. AI Systems That Ship.',
    description:
      'Full-stack developer and AI systems architect pairing 17 years of enterprise commercial operations with sub-250ms voice pipelines and stateful LangGraph agents.',
    creator: '@aibabahq',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/dhrubo-logo.gif',
    apple: '/dhrubo-portrait.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#05070a] text-[#eef8f4] antialiased">
        {children}
      </body>
    </html>
  );
}
