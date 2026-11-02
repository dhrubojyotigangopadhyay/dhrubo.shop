import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "What dhrubo.shop collects (Google Analytics with consent, enquiry emails, rate-limit hashes) and what it does not.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <div className="prose-site">
        <h1 className="font-display text-4xl">Privacy</h1>
        <p>Last updated 2 November 2026. This is a personal site run by Dhrubojyoti Gangopadhyay from Kolkata, India.</p>
        <h2>Analytics</h2>
        <p>
          The site uses Google Analytics 4 to understand which pages and projects are useful. Consent Mode is enabled:
          until you accept the banner, no analytics cookie is set and only cookieless, aggregated signals are sent. You
          can decline, and you can change your mind by clearing site data in your browser. No advertising features are
          used and no data is shared for ads personalisation.
        </p>
        <h2>The assistant</h2>
        <p>
          Questions typed into the assistant are sent to a hosted language model provider (Groq) together with passages
          from this site, to produce an answer. The server logs latency, the number of passages used and a one-way hash
          of your IP address for rate limiting. The text of your question is not stored by this site.
        </p>
        <h2>Enquiries</h2>
        <p>
          The contact form sends your name, email, organisation and message to Dhrubo by email so he can reply. They are
          not added to any list and are not shared.
        </p>
        <h2>Cookies and storage</h2>
        <p>
          Besides the analytics cookie described above, the site stores your theme choice and your consent choice in
          your browser&apos;s local storage. Nothing else.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy: dhrubojyoti.gangopadhyay@gmail.com.</p>
      </div>
    </Container>
  );
}
