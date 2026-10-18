"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { LeadButton } from "./ContactLinks";
import { IconPin } from "./Icons";

export default function Location({ l }: { l: Project["location"] }) {
  const [map, setMap] = useState(false);
  const q = encodeURIComponent(l.mapQuery);

  return (
    <section id="location" className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">10 / الموقع</p>
          <h2 className="h2 mt-3">{l.heading}</h2>
          <p className="mt-5 flex gap-2 leading-relaxed text-ink/80">
            <IconPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
            {l.address}
          </p>

          <ul className="mt-7 divide-y divide-line rounded-2xl border border-line">
            {l.times.map((t) => (
              <li key={t.place} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-[15px] text-ink">{t.place}</span>
                <span className="rounded-full bg-sand px-3 py-1 text-sm font-semibold text-ink"><span className="num">{t.min}</span> دقيقة</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">أوقات تقريبية بالسيارة.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {l.near.map((n) => (
              <span key={n} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink/80">{n}</span>
            ))}
          </div>
        </div>

        <div className="reveal flex flex-col gap-3">
          <div className="relative min-h-[380px] flex-1 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            {map ? (
              <iframe
                title="الخريطة التفاعلية"
                src={`https://www.google.com/maps?q=${q}&z=14&output=embed`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : l.mapImage ? (
              <>
                <Image src={l.mapImage} alt={l.mapAlt ?? "خريطة الموقع"} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-contain p-2" />
                <button onClick={() => setMap(true)} className="btn btn-primary absolute bottom-4 left-1/2 -translate-x-1/2 !py-2.5 text-sm shadow-lg">
                  <IconPin className="h-4 w-4" /> اعرض الخريطة التفاعلية
                </button>
              </>
            ) : (
              <button onClick={() => setMap(true)} className="absolute inset-0 grid place-items-center">
                <span className="text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-gold-soft shadow-lg"><IconPin className="h-7 w-7" /></span>
                  <span className="mt-4 block font-semibold text-ink">اعرض الخريطة التفاعلية</span>
                </span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-ink">افتح في جوجل ماب</a>
            <LeadButton source="location" title="تفاصيل الموقع">اطلب تفاصيل الموقع</LeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
