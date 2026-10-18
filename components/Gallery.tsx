"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { LeadButton } from "./ContactLinks";
import { IconClose } from "./Icons";

export default function Gallery({ items }: { items: Project["gallery"] }) {
  const CATS = ["الكل", ...Array.from(new Set(items.map((g) => g.cat)))];
  const [cat, setCat] = useState("الكل");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "الكل" ? items : items.filter((g) => g.cat === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  return (
    <section id="gallery" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <p className="eyebrow">07 / الصور</p>
            <h2 className="h2 mt-3">معرض الصور</h2>
          </div>
          <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-line">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-ink text-white" : "text-ink/70"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
          {list.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-2xl ${i % 3 === 0 ? "col-span-2" : ""}`}
              aria-label={`عرض: ${g.alt}`}
            >
              <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute bottom-3 right-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur">{g.cat}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted">تصورات فنية — الصور لأغراض توضيحية.</p>
          <LeadButton source="gallery" title="احجز معاينة" className="btn btn-primary !py-2.5 text-sm">احجز معاينة</LeadButton>
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label="إغلاق"><IconClose /></button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={list[open].src} alt={list[open].alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
