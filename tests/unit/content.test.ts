import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { faqs } from "@/content/faq";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { articles } from "@/content/writing";
import { ContactSchema, buildMailto } from "@/lib/contact";

/** Guards against the claims that were removed during the November 2026 audit creeping back in. */
const BANNED = [/31\+? (production|public|ai) (architectures|systems)/i, /<\s?250\s?ms/i, /dhruboshop/i, /2\.5 years/i, /17 years/i, /18 years/i, /15 years/i];

describe("content integrity", () => {
  it("contains none of the previously unverifiable claims", () => {
    const blob = JSON.stringify({ profile, projects, faqs, services, articles });
    for (const re of BANNED) expect(blob).not.toMatch(re);
  });
  it("every project has a slug, repo, honest status label and at least one limitation", () => {
    const slugs = new Set<string>();
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
      expect(p.repo).toMatch(/^https:\/\/github\.com\/ganguydhrubo\//);
      expect(p.limitations.length).toBeGreaterThan(0);
      if (p.status === "prototype") expect(p.statusLabel).toMatch(/prototype/i);
    }
  });
  it("every article has an MDX file and cross-references existing projects", () => {
    for (const a of articles) {
      expect(existsSync(join(process.cwd(), "src/content/writing", `${a.slug}.mdx`))).toBe(true);
      for (const slug of a.relatedProjects) expect(projects.some((p) => p.slug === slug)).toBe(true);
    }
  });
  it("profile uses the real GitHub handle and sixteen enterprise years", () => {
    expect(profile.github).toBe("https://github.com/ganguydhrubo");
    expect(profile.yearsEnterprise).toBe(16);
  });
});

describe("ContactSchema", () => {
  const ok = { name: "Asha Rao", email: "asha@example.com", intent: "project", message: "We run a dealer network and want approval-gated automation.", consent: true };
  it("accepts a valid enquiry and builds a mailto fallback", () => {
    const r = ContactSchema.safeParse(ok);
    expect(r.success).toBe(true);
    const m = buildMailto({ ...ok, organisation: "", intent: "project" });
    expect(m.startsWith("mailto:dhrubojyoti.gangopadhyay@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(m)).toContain("Project enquiry from Asha Rao");
  });
  it("rejects missing consent, short messages, bad emails and a filled honeypot", () => {
    expect(ContactSchema.safeParse({ ...ok, consent: false }).success).toBe(false);
    expect(ContactSchema.safeParse({ ...ok, message: "too short" }).success).toBe(false);
    expect(ContactSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false);
    expect(ContactSchema.safeParse({ ...ok, website: "http://spam" }).success).toBe(false);
  });
});
