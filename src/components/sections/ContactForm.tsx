"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { ContactSchema, buildMailto } from "@/lib/contact";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string; mailto?: string };

const intents = [
  { value: "hire", label: "A role or contract" },
  { value: "project", label: "A scoped project" },
  { value: "collaborate", label: "Collaboration or speaking" },
  { value: "other", label: "Something else" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const started = useRef(false);

  const onFocus = () => {
    if (!started.current) {
      started.current = true;
      track("enquiry_start");
    }
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      organisation: String(form.get("organisation") ?? ""),
      intent: String(form.get("intent") ?? "other"),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };
    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; mailto?: string };
      if (res.ok) {
        track("enquiry_submit", { intent: parsed.data.intent, channel: "api" });
        setStatus({ kind: "sent" });
        return;
      }
      setStatus({
        kind: "error",
        message: body.error ?? "Something went wrong.",
        mailto: body.mailto ?? buildMailto(parsed.data),
      });
    } catch {
      setStatus({ kind: "error", message: "Network error.", mailto: buildMailto(parsed.data) });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="card p-6">
        <p className="font-display text-2xl">Received.</p>
        <p className="mt-2 text-sm text-ink-soft">I reply within two working days, usually sooner. If it is urgent, WhatsApp is faster.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card space-y-5 p-6" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" errors={errors} onFocus={onFocus} autoComplete="name" />
        <Field label="Email" name="email" type="email" errors={errors} onFocus={onFocus} autoComplete="email" />
      </div>
      <Field label="Organisation (optional)" name="organisation" errors={errors} onFocus={onFocus} autoComplete="organization" />
      <fieldset>
        <legend className="text-sm font-medium">What is this about?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {intents.map((i, idx) => (
            <label key={i.value} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm has-[:checked]:border-ink">
              <input type="radio" name="intent" value={i.value} defaultChecked={idx === 0} onFocus={onFocus} className="accent-[var(--accent)]" />
              {i.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={20}
          maxLength={3000}
          onFocus={onFocus}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="The workflow, the team, the timeline. Twenty characters minimum."
          className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted focus:border-line-strong focus:outline-none"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-accent">
            Please write at least twenty characters.
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people, filled by naive bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 accent-[var(--accent)]" aria-invalid={Boolean(errors.consent)} />
        <span>
          I agree that this message and my contact details are sent to Dhrubo by email so he can reply. Nothing else is
          done with them. {errors.consent && <span className="text-accent">(required)</span>}
        </span>
      </label>
      {status.kind === "error" && (
        <div role="alert" className="rounded-lg border border-accent/40 bg-accent/5 p-3 text-sm">
          <p>{status.message}</p>
          {status.mailto && (
            <p className="mt-1">
              <a href={status.mailto} className="underline underline-offset-4" onClick={() => track("enquiry_submit", { channel: "mailto" })}>
                Send the same message from your email app instead
              </a>
              .
            </p>
          )}
        </div>
      )}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={status.kind === "sending"} className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper disabled:opacity-50">
          {status.kind === "sending" ? "Sending…" : "Send"}
        </button>
        <p id="form-note" className="text-xs text-muted">
          Rate-limited and validated server-side. No tracking beyond the analytics consent you chose.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  errors,
  onFocus,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  errors: Record<string, string[]>;
  onFocus: () => void;
  autoComplete?: string;
}) {
  const invalid = Boolean(errors[name]);
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onFocus={onFocus}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${name}-error` : undefined}
        className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm focus:border-line-strong focus:outline-none"
      />
      {invalid && (
        <p id={`${name}-error`} className="mt-1 text-xs text-accent">
          Please check this field.
        </p>
      )}
    </div>
  );
}
