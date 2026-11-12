"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

type Theme = "light" | "dark";
const KEY = "dhrubo.theme";

/**
 * Inline bootstrap, injected in <head> before paint, so the theme never
 * flashes. It also marks the motion mode for the homepage film (film-on /
 * film-static, and film-intro once per session) so the first layout is
 * already the final one. Kept tiny and nonce-tagged for the CSP.
 */
export const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('${KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches,c=document.documentElement.classList;c.add(r?'film-static':'film-on');var p=location.pathname;if(p==='/'||p.indexOf('/projects/')===0)c.add('cine');if(!r&&!sessionStorage.getItem('dhrubo.intro'))c.add('film-intro');}catch(e){}})();`;

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
    track("theme_toggle", { theme: next });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle rounded-lg p-2 text-ink-soft hover:bg-surface-2"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
