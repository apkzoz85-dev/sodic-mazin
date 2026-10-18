import { LeadButton, WaButton } from "./ContactLinks";

const STEPS = [
  { big: "1.5%", t: "المقدم", d: "عند الحجز" },
  { big: "98.5%", t: "الأقساط", d: "ربع سنوية على 10 سنين" },
  { big: "2030", t: "الاستلام", d: "المرحلة الجديدة" },
];

export default function PaymentPlan() {
  return (
    <section id="payment" className="py-20 md:py-28">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">04 / خطة السداد</p>
          <h2 className="h2 mt-3">خطة سداد مريحة على المدى الطويل</h2>
          <p className="mt-3 text-muted">قسّط على مدة لحد 10 سنين في المرحلة الجديدة.</p>
        </div>

        <ol className="reveal relative mt-12 grid gap-4 md:grid-cols-3">
          <div className="absolute inset-x-[16%] top-12 hidden h-px bg-line md:block" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative rounded-3xl border border-line bg-white p-7 text-center">
              <span className="absolute right-5 top-5 text-xs font-semibold text-gold">0{i + 1}</span>
              <p className="font-display text-4xl font-extrabold text-ink"><span className="num">{s.big}</span></p>
              <p className="mt-3 font-semibold text-ink">{s.t}</p>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-sand/60 p-5 text-center sm:flex-row sm:text-right">
          <p className="text-[15px] text-ink"><strong>نظام بديل:</strong> مقدم 5% · 10 سنين بأقساط متصاعدة</p>
          <div className="flex gap-2">
            <LeadButton source="payment" className="btn btn-primary !py-2.5 text-sm">خُد خطة السداد كاملة</LeadButton>
            <WaButton msg="مرحبًا، ابعتلي خطة السداد الكاملة لسوديك إيست." className="btn btn-wa !py-2.5 text-sm" />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted">خطة سداد استرشادية — تأكد من الشروط الحالية مع فريق المبيعات.</p>
      </div>
    </section>
  );
}
