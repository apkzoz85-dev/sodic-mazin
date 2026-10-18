"use client";

import { useMemo, useState } from "react";
import { PAYMENT_PLANS, UNITS, fmt } from "@/lib/site";
import { LeadButton, WaButton } from "./ContactLinks";

export default function Calculator() {
  const [unitId, setUnitId] = useState(UNITS[0].id);
  const [planId, setPlanId] = useState(PAYMENT_PLANS[0].id);
  const unit = UNITS.find((u) => u.id === unitId)!;
  const plan = PAYMENT_PLANS.find((p) => p.id === planId)!;

  const r = useMemo(() => {
    const down = unit.price * plan.down;
    const rest = unit.price - down;
    const quarters = plan.years * 4;
    const quarterly = rest / quarters;
    return { down, quarterly, monthly: quarterly / 3, quarters };
  }, [unit, plan]);

  return (
    <section id="calculator" className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow">05 / حاسبة الأقساط</p>
          <h2 className="h2 mt-3">احسب قسطك في ثواني</h2>
          <p className="mt-4 leading-relaxed text-muted">
            اختار الوحدة ونظام السداد وشوف المقدم والقسط الربع سنوي التقريبي على سعر البداية. الأرقام النهائية بتتحدد حسب الوحدة والدور والفيو.
          </p>
        </div>

        <div className="reveal rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink/80">الوحدة</span>
              <select className="field" value={unitId} onChange={(e) => setUnitId(e.target.value)}>
                {UNITS.map((u) => <option key={u.id} value={u.id}>{u.title} — {u.area}</option>)}
              </select>
            </label>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink/80">نظام السداد</span>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${planId === p.id ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink/40"}`}
                  >
                    {p.down * 100}% مقدم
                  </button>
                ))}
              </div>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs text-muted">سعر البداية</dt>
              <dd className="mt-1 font-display text-lg font-bold text-ink"><span className="num">{fmt(unit.price)}</span></dd>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-xs text-muted">المقدم ({plan.down * 100}%)</dt>
              <dd className="mt-1 font-display text-lg font-bold text-ink"><span className="num">{fmt(r.down)}</span></dd>
            </div>
            <div className="rounded-2xl bg-ink p-4 text-white">
              <dt className="text-xs text-white/70">القسط الربع سنوي</dt>
              <dd className="mt-1 font-display text-lg font-bold text-gold-soft"><span className="num">{fmt(r.quarterly)}</span></dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted">
            ≈ <span className="num font-semibold text-ink">{fmt(r.monthly)}</span> ج.م شهريًا · {r.quarters} قسط على {plan.years} سنين
          </p>
          <p className="mt-1 text-xs text-muted">حساب تقريبي بأقساط متساوية للتوضيح فقط — {plan.note}.</p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <LeadButton source="calculator" unit={unit.title} title={`خطة سداد ${unit.title}`}>خُد الحسبة الرسمية</LeadButton>
            <WaButton msg={`مرحبًا، عايز تفاصيل ${unit.title} في سوديك إيست بنظام ${plan.label}.`} className="btn btn-ghost text-wa" />
          </div>
        </div>
      </div>
    </section>
  );
}
