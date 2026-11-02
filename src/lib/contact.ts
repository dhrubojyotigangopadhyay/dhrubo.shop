import { z } from "zod";
import { profile } from "@/content/profile";

export const ContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  organisation: z.string().trim().max(120).optional().default(""),
  intent: z.enum(["hire", "project", "collaborate", "other"]),
  message: z.string().trim().min(20).max(3000),
  consent: z.literal(true),
  /** Honeypot: real browsers leave it empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export function labelFor(intent: ContactInput["intent"]) {
  return { hire: "Role enquiry", project: "Project enquiry", collaborate: "Collaboration", other: "Message" }[intent];
}

export function buildMailto(d: Pick<ContactInput, "name" | "email" | "organisation" | "intent" | "message">) {
  const subject = encodeURIComponent(`[dhrubo.shop] ${labelFor(d.intent)} from ${d.name}`);
  const body = encodeURIComponent(`${d.message}\n\n— ${d.name}${d.organisation ? `, ${d.organisation}` : ""}\n${d.email}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}
