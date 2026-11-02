import { headers } from "next/headers";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { AskOpenTracker } from "@/components/assistant/AskOpenTracker";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description =
  "Ask a retrieval-grounded assistant about Dhrubojyoti Gangopadhyay's projects, architecture decisions and background. It answers only from this site and cites the page each answer came from.";

export const metadata = pageMetadata({
  title: "Ask about Dhrubo's work",
  description,
  path: "/ask",
});

export default async function AskPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <Container className="py-10">
      <AskOpenTracker />
      <JsonLd
        data={graph(
          webPageJsonLd("/ask", "Ask about Dhrubo's work", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ask", path: "/ask" },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Ask", href: "/ask" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-3">Ask</p>
          <h1 className="font-display text-4xl sm:text-5xl">An assistant that only knows what this site says</h1>
          <div className="prose-site mt-6">
            <p>
              This is a small retrieval-augmented system, built the way I build them for clients: a BM25 index over
              the site&apos;s content is queried for every question, the top passages are handed to the model with
              instructions to cite them, and the answer is streamed back with source chips you can click.
            </p>
            <h3>What it will not do</h3>
            <ul>
              <li>Invent projects, clients, metrics or dates. If the site does not say it, the assistant says so.</li>
              <li>Follow instructions typed into the question box; visitor text is treated as data, not commands.</li>
              <li>Store your question with your identity. Logs record latency and a hashed IP for rate limiting only.</li>
            </ul>
            <h3>How it is built</h3>
            <ul>
              <li>Knowledge base generated at build time from the same files that render the pages (108 passages).</li>
              <li>Dependency-free BM25 ranking in the API route; no vector database for a corpus this size.</li>
              <li>Zod-validated input, injection-pattern flagging, per-IP rate limit, 20-second upstream timeout, capped output tokens.</li>
              <li>Model: an open-weights model served by Groq; the provider is one environment variable.</li>
            </ul>
          </div>
        </div>
        <div className="card flex h-[36rem] flex-col overflow-hidden lg:sticky lg:top-24">
          <AssistantPanel surface="page" />
        </div>
      </div>
    </Container>
  );
}
