import { renderOg } from "@/lib/seo/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return renderOg({
    kicker: "dhrubo.shop",
    title: "AI systems for operations that stop and ask before they act.",
    footer: "www.dhrubo.shop",
  });
}
