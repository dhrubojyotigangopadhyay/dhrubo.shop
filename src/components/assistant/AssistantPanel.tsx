"use client";

import Link from "next/link";
import { Square, Send, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { SUGGESTED, renderWithCitations, useAssistant, type Source } from "./useAssistant";

export function AssistantPanel({ surface, autoFocus = false }: { surface: "widget" | "page"; autoFocus?: boolean }) {
  const { turns, loading, ask, stop, reset } = useAssistant(surface);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [turns]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = input;
    setInput("");
    void ask(q);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={logRef} role="log" aria-live="polite" aria-busy={loading} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {turns.map((t, i) => (
          <div key={i} className={t.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                t.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-sm text-paper"
                  : `max-w-[92%] rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3 text-sm ${t.error ? "text-accent" : ""}`
              }
            >
              <p className="whitespace-pre-wrap leading-relaxed">
                {t.role === "assistant" && t.sources
                  ? renderWithCitations(t.content, t.sources).map((p) =>
                      typeof p === "string" ? (
                        p
                      ) : (
                        <Citation key={p.key} source={p.cite} surface={surface} />
                      ),
                    )
                  : t.content || (loading && i === turns.length - 1 ? <span className="text-muted">Thinking…</span> : "")}
              </p>
              {t.role === "assistant" && t.sources && t.sources.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Sources">
                  {t.sources.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={s.url}
                        onClick={() => track("ai_source_click", { surface, url: s.url })}
                        className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted hover:border-line-strong hover:text-ink"
                      >
                        <span className="text-accent">{s.id}</span> {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        {turns.length === 1 && (
          <ul className="grid gap-2 pt-2" aria-label="Suggested questions">
            {SUGGESTED.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => void ask(q)}
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-left text-sm text-ink-soft hover:border-line-strong hover:text-ink"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={submit} className="flex items-end gap-2 border-t border-line p-3">
        <label htmlFor={`assistant-input-${surface}`} className="sr-only">
          Your question
        </label>
        <textarea
          id={`assistant-input-${surface}`}
          value={input}
          autoFocus={autoFocus}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          rows={1}
          maxLength={1200}
          placeholder="Ask about projects, architecture, background…"
          className="max-h-32 min-h-[2.6rem] flex-1 resize-y rounded-lg border border-line bg-bg px-3 py-2 text-sm placeholder:text-muted focus:border-line-strong focus:outline-none"
        />
        {loading ? (
          <button type="button" onClick={stop} aria-label="Stop" className="rounded-lg border border-line-strong p-2.5 hover:bg-surface-2">
            <Square size={16} />
          </button>
        ) : (
          <button type="submit" aria-label="Send" disabled={!input.trim()} className="rounded-lg bg-ink p-2.5 text-paper disabled:opacity-40">
            <Send size={16} />
          </button>
        )}
        <button type="button" onClick={reset} aria-label="Start over" className="rounded-lg p-2.5 text-muted hover:bg-surface-2">
          <RotateCcw size={16} />
        </button>
      </form>
      <p className="px-4 pb-3 text-[11px] leading-snug text-muted">
        Grounded in this site&apos;s pages only; it will say when it does not know. Questions are not stored with your
        identity. Model calls are rate-limited.
      </p>
    </div>
  );
}

function Citation({ source, surface }: { source: Source; surface: string }) {
  return (
    <Link
      href={source.url}
      onClick={() => track("ai_source_click", { surface, url: source.url })}
      className="mx-0.5 inline-block rounded bg-surface-2 px-1 font-mono text-[10px] align-super text-accent hover:underline"
      aria-label={`Source: ${source.title}`}
    >
      {source.id}
    </Link>
  );
}
