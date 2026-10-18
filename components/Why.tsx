import { DEVELOPER, WHY } from "@/lib/site";
import { CallButton, LeadButton } from "./ContactLinks";

export function Why() {
  return (
    <section id="why" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">11 / ليه تستثمر</p>
          <h2 className="h2 mt-3">ليه سوديك إيست اختيار ذكي دلوقتي</h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <li key={w.t} className="reveal rounded-3xl bg-white p-7 ring-1 ring-line">
              <span className="font-display text-3xl font-extrabold text-gold/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{w.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.d}</p>
            </li>
          ))}
        </ol>
        <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
          <LeadButton source="why" title="كلم مستشار عقاري">كلم مستشار عقاري</LeadButton>
          <CallButton className="btn btn-ghost text-ink">اتصل الآن</CallButton>
        </div>
      </div>
    </section>
  );
}

export function Developer() {
  return (
    <section id="developer" className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="reveal">
          <p className="eyebrow">12 / المطوّر</p>
          <h2 className="h2 mt-3">عن سوديك</h2>
          <p className="mt-5 text-[15.5px] leading-[1.95] text-ink/80">{DEVELOPER.about}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {DEVELOPER.facts.map((f) => (
              <li key={f} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">{f}</li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-3xl border border-line p-7">
          <h3 className="font-display text-lg font-bold text-ink">أبرز المشروعات</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            {DEVELOPER.projects.map((p) => (
              <li key={p} className="border-b border-line py-3 text-[15px] text-ink/85">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
