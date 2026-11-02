import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  pageExtensions: ["ts", "tsx", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["lucide-react", "motion"] },
  // Crawlers that do not execute JavaScript get metadata rendered in <head> instead of streamed.
  // Extends Next's default list with AI answer/training crawlers and Lighthouse.
  htmlLimitedBots:
    /Mediapartners-Google|Slurp|DuckDuckBot|DuckAssistBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|Chrome-Lighthouse|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|meta-webindexer|Meta-ExternalAgent|MistralAI|YouBot|Amazonbot|Amzn-SearchBot|CCBot|Bytespider/i,
  async redirects() {
    return [
      { source: "/cv", destination: "/resume", permanent: true },
      { source: "/projects/sahakarmi", destination: "/projects/sahkarmi", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: { remarkPlugins: [["remark-gfm", {}]] },
});

export default withMDX(nextConfig);
