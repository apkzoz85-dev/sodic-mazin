"use client";

import { useState } from "react";
import { UNITS } from "@/lib/site";
import { LeadButton } from "./ContactLinks";
import { IconDownload } from "./Icons";

export default function FloorPlans() {
  const [id, setId] = useState(UNITS[0].id);
  const u = UNITS.find((x) => x.id === id)!;

  return (
    <section id="plans" className="py-20 md:py-28">
      <div className="container-x">
        <div className="reveal">
          <p className="eyebrow">06 / المخططات</p>
          <h2 className="h2 mt-3">مخططات الوحدات</h2>
          <p className="mt-3 text-muted">اختار الوحدة واطلب المخطط الرسمي.</p>
        </div>

        <div className="reveal mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0" role="tablist">
            {UNITS.map((x) => (
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

          <div className="grid overflow-hidden rounded-3xl border border-line md:grid-cols-2">
            <div className="relative grid min-h-64 place-items-center bg-cream p-8">
              <svg viewBox="0 0 200 150" className="w-full max-w-xs text-ink/25" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="10" y="10" width="180" height="130" />
                <path d="M10 70h70V10M80 70v70M120 10v55h70M120 65v20M150 85h40M120 105h30v35" />
                <path d="M95 140v-14M40 70v-10" strokeWidth="3" className="text-gold" stroke="currentColor" />
              </svg>
              <span className="absolute bottom-5 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-ink ring-1 ring-line">المخطط الرسمي متاح عند الطلب</span>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-ink">{u.title}</h3>
              <table className="mt-5 w-full text-sm">
                <tbody className="divide-y divide-line">
                  {[
                    ["المرحلة", u.phase],
                    ["غرف النوم", u.beds],
                    ["المساحة التقريبية", u.area],
                    ["سعر البداية", `${u.priceLabel} ج.م`],
                    ["الاستلام", u.delivery],
                    ["التشطيب", u.phase === "ميدوز" ? "حسب المرحلة" : "Flexi مرن"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <th className="py-3 text-right font-normal text-muted">{k}</th>
                      <td className="py-3 text-left font-semibold text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <LeadButton source={`plan-${u.id}`} unit={u.title} title={`مخطط ${u.title}`} className="btn btn-primary mt-6 w-full">
                <IconDownload /> اطلب مخطط الوحدة
              </LeadButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
