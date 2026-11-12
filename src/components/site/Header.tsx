"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="z-40 border-b border-line">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-[var(--gutter)]">
        <Link href="/" className="brand" aria-label="Dhrubo, home">
          Dhrubo<i>.</i>
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="nav-link">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-bone ml-4" style={{ minHeight: "2.4rem" }}>
            Contact
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="menu-sheet md:hidden">
          <ul>
            {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/resume", label: "Résumé" }, { href: "/contact", label: "Contact" }].map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <Link href={l.href} aria-current={(l.href === "/" ? pathname === "/" : isActive(l.href)) ? "page" : undefined} onClick={() => setOpen(false)}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
