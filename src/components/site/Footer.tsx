import Link from "next/link";
import { profile } from "@/content/profile";
import { NAV_LINKS } from "@/lib/site";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">Dhrubojyoti Gangopadhyay</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Forward deployed and applied AI engineer in {profile.location.city}, {profile.location.country}. Builds
            agentic systems that stop and ask before they act. Everything on this site is checked against public
            evidence; last verified {profile.verifiedOn}.
          </p>
          <p className="mt-4 text-sm">
            <TrackedLink href={`mailto:${profile.email}`} className="underline underline-offset-4">
              {profile.email}
            </TrackedLink>
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Site</p>
          <ul className="space-y-2 text-sm">
            {[...NAV_LINKS, { href: "/contact", label: "Contact" }, { href: "/resume", label: "Résumé" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <TrackedLink href={profile.github} className="hover:underline underline-offset-4">
                GitHub
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={profile.linkedin} className="hover:underline underline-offset-4">
                LinkedIn
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href="https://sahkarmi.site" className="hover:underline underline-offset-4">
                Sahkarmi
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={profile.devto} className="hover:underline underline-offset-4">
                dev.to
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={profile.whatsapp} className="hover:underline underline-offset-4">
                WhatsApp
              </TrackedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:px-6">
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
    </footer>
  );
}
