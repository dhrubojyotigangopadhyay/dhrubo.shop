import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dhrubo | Applied AI Engineer',
    template: '%s | Dhrubo',
  },
  description:
    'Dhrubojyoti Gangopadhyay (Dhrubo) — Applied AI Engineer building agentic systems and workflow automation for business operations, with 16 years of prior enterprise revenue operations leadership.',
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
    'Applied AI Engineer',
    'Forward Deployed Engineer',
    'AI Solutions Engineer',
    'AI Agents',
    'Agentic AI',
    'LLM Integration',
    'Workflow Automation',
    'Model Context Protocol',
    'LangGraph',
    'Business Process Automation',
    'Revenue Operations',
    'TypeScript',
    'Python',
    'FastAPI',
    'Next.js',
  ],
  openGraph: {
    title: 'Dhrubo | Applied AI Engineer — Enterprise Instincts, Systems That Ship',
    description:
      'Applied AI systems built with 16 years of enterprise revenue operations context. Open source, inspectable: source code, commit history, tests and releases.',
    url: 'https://dhrubo.shop',
    siteName: 'Dhrubo',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhrubojyoti Gangopadhyay — Applied AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhrubo | Applied AI Engineer — Enterprise Instincts, Systems That Ship',
    description:
      'Applied AI Engineer pairing 16 years of enterprise revenue operations with agentic systems, workflow automation and approval-gated AI. All code public.',
    creator: '@DhruboZ4U',
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
