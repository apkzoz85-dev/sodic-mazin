"use client";

import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { CallButton, LeadButton } from "./ContactLinks";
import { IconClose } from "./Icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={SITE.name}>
      <span className={`grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-extrabold ${light ? "bg-white/10 text-gold-soft ring-1 ring-white/25" : "bg-ink text-gold-soft"}`}>S</span>
      <span className="leading-tight">
        <span className={`block font-display text-[1.05rem] font-bold ${light ? "text-white" : "text-ink"}`}>{SITE.name}</span>
        <span className={`block text-[10px] tracking-[.2em] ${light ? "text-white/60" : "text-muted"}`}>SODIC EAST</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !solid && !open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid || open ? "bg-white/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur" : "bg-linear-to-b from-black/45 to-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo light={light} />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="أقسام الصفحة">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`text-sm font-medium transition-colors ${light ? "text-white/85 hover:text-white" : "text-ink/75 hover:text-ink"}`}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton className={`hidden items-center gap-2 text-sm font-semibold md:inline-flex ${light ? "text-white" : "text-ink"}`} />
          <LeadButton source="header" className="btn btn-gold !px-5 !py-2.5 text-sm">اطلب الأسعار</LeadButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${light ? "text-white" : "text-ink"}`}
            aria-label="القائمة"
            aria-expanded={open}
          >
            {open ? <IconClose /> : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-x grid py-3" aria-label="القائمة">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line/70 py-3 text-[15px] font-medium text-ink last:border-0">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
