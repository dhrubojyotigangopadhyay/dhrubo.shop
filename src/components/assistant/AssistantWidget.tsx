"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MessageSquareText, X } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

// The panel (and its state hook) is only downloaded when a visitor opens it.
const AssistantPanel = dynamic(() => import("./AssistantPanel").then((m) => m.AssistantPanel), { ssr: false });

export function AssistantWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The /ask page renders the full-size panel; no floating widget there.
  if (pathname === "/ask") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) track("ai_assistant_open", { surface: "widget", page_path: pathname });
        }}
        aria-expanded={open}
        aria-controls="assistant-dialog"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium shadow-card hover:bg-surface-2"
      >
        {open ? <X size={16} /> : <MessageSquareText size={16} />}
        {open ? "Close" : "Ask about my work"}
      </button>
      {open && (
        <div
          id="assistant-dialog"
          role="dialog"
          aria-label="Ask about Dhrubo's work"
          className="fixed bottom-20 right-4 z-40 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-card"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <p className="text-sm font-semibold">Ask about Dhrubo&apos;s work</p>
            <a href="/ask" className="text-xs text-muted underline underline-offset-4">
              Open full page
            </a>
          </div>
          <AssistantPanel surface="widget" autoFocus />
        </div>
      )}
    </>
  );
}
