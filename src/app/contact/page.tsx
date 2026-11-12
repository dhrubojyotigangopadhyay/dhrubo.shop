import { PageHero } from "@/components/stage/PageHero";
import { headers } from "next/headers";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { profile } from "@/content/profile";
import { breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

const description = "Contact Dhrubojyoti Gangopadhyay about roles, projects or collaboration: enquiry form, email, WhatsApp and LinkedIn. Kolkata, India; replies within two working days.";

export const metadata = pageMetadata({ title: "Contact", description, path: "/contact" });

export default async function ContactPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <Container className="stage-pad">
      <JsonLd
        data={graph(
          webPageJsonLd("/contact", "Contact", description),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
        nonce={nonce}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <PageHero
            compact
            no="08"
            label="Contact"
            title={
              <>
                Say what you are <em>trying to do</em>
              </>
            }
            lede={
              <p>
                A role, a workflow you want automated, a question about the code. I read everything and reply within
                two working days.
              </p>
            }
          />
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1">
                <TrackedLink href={`mailto:${profile.email}`} className="underline underline-offset-4">
                  {profile.email}
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">WhatsApp</dt>
              <dd className="mt-1">
                <TrackedLink href={profile.whatsapp} className="underline underline-offset-4">
                  {profile.phoneDisplay}
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">LinkedIn</dt>
              <dd className="mt-1">
                <TrackedLink href={profile.linkedin} className="underline underline-offset-4">
                  linkedin.com/in/dhrubojyoti-gangopadhyay
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Time zone</dt>
              <dd className="mt-1">India Standard Time (UTC+5:30); comfortable with US and EU morning overlap.</dd>
            </div>
          </dl>
            <div className="mt-8">
              <p className="eyebrow mb-3">Elsewhere</p>
              <SocialLinks ids={["linkedin", "github", "youtube", "x", "instagram", "facebook", "devto"]} />
            </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
