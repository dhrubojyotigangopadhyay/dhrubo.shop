import Image from "next/image";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * Server-rendered hero: the LCP element is the headline text, the portrait is
 * a priority <Image>, and nothing here needs JavaScript to be readable.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-paper pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <Container className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="eyebrow mb-5">
            {profile.location.city}, {profile.location.country} · remote-ready · facts verified {profile.verifiedOn}
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            AI systems for operations that <em className="text-accent">stop and ask</em> before they act.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
            I&apos;m Dhrubojyoti Gangopadhyay, a forward deployed and applied AI engineer. I build agentic systems
            with human approval gates, ship them in the open, and bring sixteen years of enterprise revenue
            operations to the scoping.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects/sahkarmi">
              See Sahkarmi <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Work with me
            </ButtonLink>
            <ButtonLink href="/resume" variant="ghost">
              One-page résumé
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Currently Forward Deployed AI Engineer at 1XL Universe. Source for every claim on this site is linked;{" "}
            <TrackedLink href={profile.github} className="underline underline-offset-4">
              the code is public
            </TrackedLink>
            .
          </p>
          <SocialLinks compact className="mt-5" ids={["github", "linkedin", "youtube", "x", "instagram", "facebook", "devto"]} />
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-line bg-surface-2">
            <Image
              src={profile.portrait}
              alt="Portrait of Dhrubojyoti Gangopadhyay"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover object-top"
            />
          </div>
          <dl className="absolute -bottom-5 left-4 right-4 grid grid-cols-2 gap-2 sm:left-6 sm:right-6">
            {profile.proof.slice(0, 2).map((p) => (
              <div key={p.label} className="card px-3 py-2.5">
                <dt className="text-[11px] uppercase tracking-wider text-muted">{p.label}</dt>
                <dd className="font-display text-2xl leading-none">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
