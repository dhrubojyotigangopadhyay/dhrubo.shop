"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

/**
 * Interactive model of the approval architecture used in Sahkarmi.
 * Pick an action; watch it move through policy evaluation, a human gate when
 * the category demands one, execution and the structured record.
 * Pure SVG + state machine; no WebGL, works with reduced motion and keyboard.
 */
type Category = "read" | "draft" | "message" | "payment";
interface Action {
  id: Category;
  label: string;
  category: string;
  decision: "allow" | "ask";
  record: Record<string, string>;
}

const ACTIONS: Action[] = [
  { id: "read", label: "Read the supplier price list", category: "files.read", decision: "allow", record: { tool: "fs.read", path: "~/suppliers/price-list.xlsx", decision: "allow (policy)", approver: "n/a" } },
  { id: "draft", label: "Draft a weekly sales report", category: "docs.write", decision: "allow", record: { tool: "docs.create", target: "Weekly report.docx", decision: "allow (policy)", approver: "n/a" } },
  { id: "message", label: "Message a customer on WhatsApp", category: "messages.external", decision: "ask", record: { tool: "whatsapp.send", to: "customer:+91…", decision: "approved", approver: "owner (Telegram)" } },
  { id: "payment", label: "Pay the supplier invoice", category: "payments", decision: "ask", record: { tool: "bank.transfer", amount: "₹48,500", decision: "approved", approver: "owner (desktop)" } },
];

type Step = 0 | 1 | 2 | 3 | 4;
const STEPS = ["Propose", "Policy", "Human gate", "Execute", "Record"] as const;

export function ApprovalFlow() {
  const [selected, setSelected] = useState<Action>(ACTIONS[3]);
  const [step, setStep] = useState<Step>(0);
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();

  const path = useMemo<Step[]>(() => (selected.decision === "ask" ? [0, 1, 2, 3, 4] : [0, 1, 3, 4]), [selected]);

  useEffect(() => {
    setStep(0);
    if (reduce) {
      setStep(4);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= path.length) {
        window.clearInterval(id);
        return;
      }
      setStep(path[i]);
    }, 650);
    return () => window.clearInterval(id);
  }, [path, run, reduce]);

  const reached = (s: Step) => path.indexOf(s) !== -1 && path.indexOf(s) <= path.indexOf(step);
  const skipped = (s: Step) => path.indexOf(s) === -1;

  return (
    <div className="card overflow-hidden">
      <div className="grid md:grid-cols-[18rem_1fr]">
        <div className="border-b border-line p-5 md:border-b-0 md:border-r">
          <p className="eyebrow mb-3">Choose an action</p>
          <ul className="space-y-1.5" role="list">
            {ACTIONS.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  aria-pressed={selected.id === a.id}
                  onClick={() => {
                    setSelected(a);
                    setRun((r) => r + 1);
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    selected.id === a.id ? "border-ink bg-ink text-paper" : "border-line hover:bg-surface-2"
                  }`}
                >
                  <span className="block">{a.label}</span>
                  <span className={`font-mono text-[11px] ${selected.id === a.id ? "text-paper/70" : "text-muted"}`}>
                    {a.category} · {a.decision === "ask" ? "always asks" : "policy allows"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="mt-4 text-xs text-muted underline underline-offset-4 hover:text-ink"
          >
            Replay
          </button>
        </div>

        <div className="p-5">
          <ol className="grid grid-cols-5 gap-2" aria-label="Execution path">
            {STEPS.map((name, i) => {
              const s = i as Step;
              const on = reached(s);
              const off = skipped(s);
              const gate = s === 2;
              return (
                <li key={name} className="relative">
                  <motion.div
                    animate={{ scale: on && !off ? 1 : 0.96 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className={`rounded-lg border px-2 py-3 text-center ${
                      on && !off
                        ? gate
                          ? "border-accent bg-accent/10"
                          : "border-forest bg-forest/10"
                        : off
                          ? "border-dashed border-line text-muted"
                          : "border-line"
                    }`}
                  >
                    <span className="block font-mono text-[10px] text-muted">0{i + 1}</span>
                    <span className="block text-xs font-medium sm:text-sm">{name}</span>
                  </motion.div>
                  {off && <span className="sr-only">skipped</span>}
                </li>
              );
            })}
          </ol>

          <div className="mt-5 min-h-[9.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selected.id}-${step}-${run}`}
                initial={reduce ? false : { y: 8 }}
                animate={{ y: 0 }}
                exit={reduce ? undefined : { y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {step === 0 && <Note title="Agent proposes a tool call">The coworker emits a structured intent, not free text: tool, arguments, reason.</Note>}
                {step === 1 && (
                  <Note title={`Policy classifies it as ${selected.category}`}>
                    {selected.decision === "ask"
                      ? "This category is one of six hard gates. The model cannot auto-approve it and the settings cannot disable the gate."
                      : "Low-impact category. Policy allows it without interrupting the owner; it is still recorded."}
                  </Note>
                )}
                {step === 2 && <Note title="A named human decides">The request is shown on the desktop and forwarded to the allow-listed Telegram chat. Approve, reject, or delegate for a bounded time.</Note>}
                {step === 3 && <Note title="Execution">Runs inside the coworker&apos;s sandboxed browser or tool runtime. Credentials never pass through the model.</Note>}
                {step === 4 && (
                  <div className="rounded-lg bg-[var(--code-bg)] p-4 font-mono text-[12px] leading-relaxed text-[var(--code-ink)]">
                    <p className="mb-1 text-[#9aa0a8]">{"// execution record"}</p>
                    {Object.entries({ ...selected.record, ts: "2026-11-02T10:14:05+05:30" }).map(([k, v]) => (
                      <p key={k}>
                        <span className="text-[#f0c05a]">{k}</span>: {v}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{children}</p>
    </div>
  );
}
