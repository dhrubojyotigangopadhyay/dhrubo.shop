import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SocialLinks } from "@/components/site/SocialLinks";
import { profile } from "@/content/profile";
import { NAV_LINKS } from "@/lib/site";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** The end card: one last line, the name at poster scale, then the practical links. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="end-card">
      <div className="end-cta">
        <p className="slate">
          <b>End</b>Credits
        </p>
        <h2 className="poster">
          The future doesn&rsquo;t <em>build itself.</em>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-solid">
            Start a conversation <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/projects" className="btn">
            See the work
          </Link>
        </div>
      </div>
      <span className="end-name" aria-hidden="true">
        Dhrubo.
      </span>
      <div className="end-grid">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-[var(--gutter)] py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">Dhrubojyoti Gangopadhyay</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Forward deployed and applied AI engineer in {profile.location.city}, {profile.location.country}. Builds
              agentic systems that stop and ask before they act. Everything on this site is checked against public
              evidence; last verified {profile.verifiedOn}.
            </p>
            <p className="mt-4 text-sm">
              <TrackedLink href={`mailto:${profile.email}`} className="underline decoration-accent underline-offset-4">
                {profile.email}
              </TrackedLink>
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-3">Site</p>
            <ul className="space-y-2 text-sm">
              {[...NAV_LINKS, { href: "/contact", label: "Contact" }, { href: "/resume", label: "Résumé" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 hover:text-accent hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <SocialLinks className="max-w-md" />
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-2 px-[var(--gutter)] py-5 text-xs text-muted">
            <span>
              © {year} Dhrubojyoti Gangopadhyay · {profile.businessName}
            </span>
            <span>
              Source on{" "}
              <TrackedLink href="https://github.com/dhrubojyotigangopadhyay/dhrubo.shop" className="underline underline-offset-4">
                GitHub
              </TrackedLink>{" "}
              · <Link href="/llms.txt">llms.txt</Link> · <Link href="/privacy">Privacy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
