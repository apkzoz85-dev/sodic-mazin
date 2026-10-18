"use client";

import Image from "next/image";
import { useState } from "react";
import type { Unit } from "@/lib/types";
import { LeadButton } from "./ContactLinks";
import { IconDownload } from "./Icons";

export default function FloorPlans({ units, priceMode }: { units: Unit[]; priceMode: "from" | "avg" }) {
  const [id, setId] = useState(units[0].id);
  const [zoom, setZoom] = useState(false);
  const u = units.find((x) => x.id === id)!;

  return (
    <section id="plans" className="py-20 md:py-28">
      <div className="container-x">
        <div className="reveal">
          <p className="eyebrow">06 / المخططات</p>
          <h2 className="h2 mt-3">مخططات الوحدات</h2>
          <p className="mt-3 text-muted">اختار الوحدة واطلب المخطط الرسمي.</p>
        </div>

        <div className="reveal mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0" role="tablist">
            {units.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={id === x.id}
                onClick={() => setId(x.id)}
                className={`shrink-0 rounded-xl border px-4 py-3 text-right text-sm font-medium transition ${id === x.id ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink/40"}`}
              >
                {x.title}
              </button>
            ))}
          </div>

          <div className="grid overflow-hidden rounded-3xl border border-line md:grid-cols-[1.15fr_.85fr]">
            <div className="relative grid min-h-72 place-items-center bg-white p-4">
              {u.plan ? (
                <button type="button" onClick={() => setZoom(true)} className="relative block h-full min-h-72 w-full" aria-label={`تكبير مخطط ${u.title}`}>
                  <Image src={u.plan.image} alt={`مخطط ${u.title}`} fill sizes="(min-width:768px) 45vw, 100vw" className="object-contain" />
                  <span className="absolute bottom-1 left-1 rounded-full bg-ink/85 px-3 py-1 text-[11px] text-white">اضغط للتكبير</span>
                </button>
              ) : (
                <>
                  <svg viewBox="0 0 200 150" className="w-full max-w-xs text-ink/25" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="10" y="10" width="180" height="130" />
                    <path d="M10 70h70V10M80 70v70M120 10v55h70M120 65v20M150 85h40M120 105h30v35" />
                    <path d="M95 140v-14M40 70v-10" strokeWidth="3" className="text-gold" stroke="currentColor" />
                  </svg>
                  <span className="absolute bottom-5 rounded-full bg-cream px-4 py-1.5 text-xs font-medium text-ink ring-1 ring-line">المخطط الرسمي متاح عند الطلب</span>
                </>
              )}
            </div>
            <div className="bg-cream/60 p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-ink">{u.title}</h3>
              <table className="mt-5 w-full text-sm">
                <tbody className="divide-y divide-line">
                  {[
                    ["الفئة", u.phase],
                    [u.beds ? "غرف النوم" : "النوع", u.beds ?? u.kind ?? "—"],
                    ["المساحة", u.area],
                    [priceMode === "avg" ? "متوسط السعر" : "سعر البداية", `${u.priceLabel} ج.م`],
                    ...(u.delivery ? [["الاستلام", u.delivery]] : []),
                    ["التشطيب", u.finishing],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <th className="py-3 text-right font-normal text-muted">{k}</th>
                      <td className="py-3 text-left font-semibold text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {u.plan && <p className="mt-4 text-xs leading-relaxed text-muted">{u.plan.caption}</p>}
              <LeadButton source={`plan-${u.id}`} unit={u.title} title={`مخططات ${u.title}`} className="btn btn-primary mt-6 w-full">
                <IconDownload /> اطلب كل مخططات الوحدة
              </LeadButton>
            </div>
          </div>
        </div>
      </div>

      {zoom && u.plan && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true" aria-label={`مخطط ${u.title}`}>
          <div className="relative h-[85vh] w-full max-w-5xl rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <Image src={u.plan.image} alt={`مخطط ${u.title}`} fill sizes="100vw" className="object-contain p-3" />
            <button onClick={() => setZoom(false)} className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink text-white" aria-label="إغلاق">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
