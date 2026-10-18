"use client";

import Image from "next/image";
import { useState } from "react";
import { UNITS } from "@/lib/site";
import { LeadButton, WaButton } from "./ContactLinks";

const TABS = ["الكل", "المرحلة الجديدة", "ميدوز"] as const;

export default function Units() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("الكل");
  const list = tab === "الكل" ? UNITS : UNITS.filter((u) => u.phase === tab);

  return (
    <section id="units" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <p className="eyebrow">02 / الوحدات</p>
            <h2 className="h2 mt-3">الوحدات وأسعار البداية</h2>
            <p className="mt-3 max-w-lg text-muted">اختار نوع الوحدة واسأل عن المتاح حاليًا. الأسعار المعروضة هي أسعار البداية.</p>
          </div>
          <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-line" role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${tab === t ? "bg-ink text-white" : "text-ink/70 hover:text-ink"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((u) => (
            <article key={u.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
              <div className="relative aspect-[16/11] overflow-hidden">
                {u.image ? (
                  <Image src={u.image} alt={`${u.title} — سوديك إيست`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-ink-deep bg-[radial-gradient(circle_at_30%_20%,rgb(184_149_90/.35),transparent_55%)]">
                    <div className="text-center">
                      <p className="text-xs tracking-[.3em] text-gold-soft">MEADOWS</p>
                      <p className="mt-2 font-display text-2xl font-bold text-white">{u.title.replace(" ميدوز", "")}</p>
                      <p className="mt-1 text-xs text-white/60">الصور والمخطط عند الطلب</p>
                    </div>
                  </div>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">{u.phase}</span>
                {u.tag && <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">{u.tag}</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">{u.title}</h3>
                  <span className="shrink-0 rounded-lg bg-sand px-2.5 py-1 text-xs font-semibold text-ink">{u.area}</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                  <div><dt className="text-xs text-muted">غرف النوم</dt><dd className="mt-0.5 font-semibold text-ink">{u.beds}</dd></div>
                  <div><dt className="text-xs text-muted">الاستلام</dt><dd className="mt-0.5 font-semibold text-ink">{u.delivery}</dd></div>
                </dl>
                <p className="mt-4 text-sm text-muted">
                  يبدأ من <strong className="font-display text-xl text-ink">{u.priceLabel}</strong> <span className="text-xs">ج.م</span>
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                  <LeadButton source={`unit-${u.id}`} unit={u.title} title={`اسأل عن ${u.title}`} className="btn btn-primary !px-3 !py-2.5 text-sm">اطلب التوافر</LeadButton>
                  <WaButton msg={`مرحبًا، أنا مهتم بـ ${u.title} (${u.area}) في سوديك إيست. هل متاحة حاليًا؟`} className="btn btn-ghost !px-3 !py-2.5 text-sm text-wa">واتساب</WaButton>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">أسعار استرشادية قابلة للتغيير من المطوّر — تأكد من المتاح قبل التعاقد.</p>
      </div>
    </section>
  );
}
