import { Facebook, Github, Instagram, Linkedin, Mail, MessageCircle, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { cn } from "@/components/ui/primitives";

/** X (formerly Twitter) wordmark; lucide ships no current X glyph. */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

/** dev.to monogram. */
function DevIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" fill="currentColor" />
      <text x="12" y="15.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif" fill="var(--bg)">
        DEV
      </text>
    </svg>
  );
}

export type Social = {
  id: string;
  name: string;
  handle: string;
  href: string;
  icon: ReactNode;
};

export const SOCIALS: Social[] = [
  { id: "github", name: "GitHub", handle: "ganguydhrubo", href: profile.github, icon: <Github size={18} /> },
  { id: "linkedin", name: "LinkedIn", handle: "dhrubojyoti-gangopadhyay", href: profile.linkedin, icon: <Linkedin size={18} /> },
  { id: "youtube", name: "YouTube", handle: "@DhruboZ", href: profile.youtube, icon: <Youtube size={18} /> },
  { id: "x", name: "X", handle: "@DhruboZ4U", href: profile.x, icon: <XIcon /> },
  { id: "instagram", name: "Instagram", handle: "@dhruboz4u", href: profile.instagram, icon: <Instagram size={18} /> },
  { id: "facebook", name: "Facebook", handle: "DhruboZ", href: profile.facebook, icon: <Facebook size={18} /> },
  { id: "devto", name: "dev.to", handle: "dhrubojyoti", href: profile.devto, icon: <DevIcon /> },
  { id: "whatsapp", name: "WhatsApp", handle: profile.phoneDisplay, href: profile.whatsapp, icon: <MessageCircle size={18} /> },
  { id: "email", name: "Email", handle: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={18} /> },
];

/**
 * Icon buttons for every public profile. `compact` renders icons only (hero);
 * the default renders icon + name + handle (footer, contact).
 */
export function SocialLinks({ compact = false, className, ids }: { compact?: boolean; className?: string; ids?: string[] }) {
  const items = ids ? SOCIALS.filter((s) => ids.includes(s.id)) : SOCIALS;
  if (compact) {
    return (
      <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Profiles elsewhere">
        {items.map((s) => (
          <li key={s.id}>
            <TrackedLink href={s.href} label={s.name} title={`${s.name}: ${s.handle}`} aria-label={`${s.name} (${s.handle})`} className="social-dot focus-visible:outline-accent">
              {s.icon}
            </TrackedLink>
          </li>
        ))}
      </ul>
    );
  }
  // One quiet row per profile: icon, name, handle. A single accent on hover, no brand colours.
  return (
    <ul className={cn("social-rows", className)} aria-label="Profiles elsewhere">
      {items.map((s) => (
        <li key={s.id}>
          <TrackedLink href={s.href} label={s.name} title={`${s.name}: ${s.handle}`} className="social-row focus-visible:outline-accent">
            <span className="social-icon">{s.icon}</span>
            <span className="social-name">{s.name}</span>
            <span className="social-handle">{s.handle}</span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
