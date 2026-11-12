"use client";

import { useState } from "react";
import { methodCases, methodSteps } from "@/content/film";
import { track } from "@/lib/analytics";

/**
 * Chapter 05. Seven fixed steps, two real domains. Scroll (or the rail)
 * moves through the steps; the tabs swap which domain the steps describe.
 * Step visibility is driven by FilmStage through the data attributes, so
 * class names here stay static and both cases remain in the HTML.
 */
export function MethodCases() {
  const [active, setActive] = useState(0);
  const current = methodCases[active];

  return (
    <div className="pin" data-pin="method" data-steps={methodSteps.length} style={{ "--steps": methodSteps.length } as React.CSSProperties}>
      <div className="pin-stage method-stage">
        <div className="method">
          <div className="method-tabs" role="tablist" aria-label="Worked example">
            {methodCases.map((c, i) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                id={`method-tab-${c.key}`}
                aria-selected={i === active}
                aria-controls="method-panel"
                onClick={() => {
                  setActive(i);
                  track("film_method_case", { case: c.key });
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="method-note">
            {current.domain}. {current.note}
          </p>
          <div className="method-grid" id="method-panel" role="tabpanel" aria-labelledby={`method-tab-${current.key}`}>
            <ol className="method-rail">
              {methodSteps.map((s, i) => (
                <li key={s}>
                  <button type="button" data-goto-step={i} aria-label={`Step ${i + 1}: ${s}`} className={i === 0 ? "on" : undefined}>
                    <i aria-hidden="true" />
                    <span>{s}</span>
                  </button>
                </li>
              ))}
            </ol>
            <ol className="method-steps">
              {methodSteps.map((s, i) => (
                <li key={s} className={i === 0 ? "method-step on" : "method-step"} data-step-item={i}>
                  <span className="n">
                    {String(i + 1).padStart(2, "0")} / {String(methodSteps.length).padStart(2, "0")}
                  </span>
                  <h3>{s}</h3>
                  {methodCases.map((c, ci) => (
                    <p key={c.key} hidden={ci !== active}>
                      {c.steps[i]}
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
