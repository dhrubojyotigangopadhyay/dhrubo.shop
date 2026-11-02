"use client";

import { useCallback, useRef, useState } from "react";
import { track } from "@/lib/analytics";

export interface Source {
  id: string;
  title: string;
  url: string;
}
export interface Turn {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  error?: boolean;
}

const WELCOME =
  "Ask about Dhrubo's projects, how Sahkarmi's approval gates work, his background, or availability. Answers come only from this site's content and cite the page they came from.";

export const SUGGESTED = [
  "How does Sahkarmi stop an agent from doing something risky?",
  "What has Dhrubo actually shipped, and what is still a prototype?",
  "How does revenue operations experience help with AI engineering?",
  "Is Dhrubo available for a forward deployed engineer role?",
];

/**
 * Client state for the assistant. Parses the streaming protocol from
 * /api/chat: a JSON header line with sources, a blank line, then tokens.
 */
export function useAssistant(surface: "widget" | "page") {
  const [turns, setTurns] = useState<Turn[]>([{ role: "assistant", content: WELCOME }]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q || loading) return;
      track("ai_question_submit", { surface, length: q.length });
      const history: Turn[] = [...turns.filter((t) => t.content !== WELCOME), { role: "user", content: q }];
      setTurns([...history, { role: "assistant", content: "" }]);
      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const started = performance.now();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ messages: history.slice(-8).map(({ role, content }) => ({ role, content })) }),
        });
        if (!res.ok || !res.body) {
          const payload = await res.json().catch(() => ({ error: "The assistant is unavailable right now." }));
          throw new Error(payload.error ?? "Request failed");
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let sources: Source[] | undefined;
        let answer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          if (!sources) {
            const split = buffer.indexOf("\n\n");
            if (split === -1) continue;
            try {
              sources = (JSON.parse(buffer.slice(0, split)) as { sources: Source[] }).sources;
            } catch {
              sources = [];
            }
            buffer = buffer.slice(split + 2);
          }
          answer += buffer;
          buffer = "";
          const snapshot = answer;
          const snapshotSources = sources;
          setTurns([...history, { role: "assistant", content: snapshot, sources: snapshotSources }]);
        }
        track("ai_response_received", { surface, ms: Math.round(performance.now() - started), sources: sources?.length ?? 0 });
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === "AbortError"
            ? "Stopped."
            : `${(err as Error).message} You can reach Dhrubo directly at dhrubojyoti.gangopadhyay@gmail.com.`;
        setTurns([...history, { role: "assistant", content: message, error: true }]);
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, surface, turns],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);
  const reset = useCallback(() => setTurns([{ role: "assistant", content: WELCOME }]), []);

  return { turns, loading, ask, stop, reset };
}

/** Replaces [S1]-style citations with superscript links into the sources list. */
export function renderWithCitations(text: string, sources: Source[] | undefined) {
  const parts = text.split(/(\[S\d+\])/g);
  return parts.map((part, i) => {
    const m = /^\[S(\d+)\]$/.exec(part);
    if (!m) return part;
    const src = sources?.find((s) => s.id === `S${m[1]}`);
    if (!src) return "";
    return { cite: src, key: i };
  });
}
