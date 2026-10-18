import Link from "next/link";
import type { Project } from "@/lib/types";
import { CallButton, LeadButton } from "./ContactLinks";

export function Why({ w }: { w: Project["why"] }) {
  return (
    <section id="why" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">11 / ليه تستثمر</p>
          <h2 className="h2 mt-3">{w.heading}</h2>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((it, i) => (
            <li key={it.t} className="reveal rounded-3xl bg-white p-7 ring-1 ring-line">
              <span className="font-display text-3xl font-extrabold text-gold/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{it.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{it.d}</p>
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

export function Developer({ d }: { d: Project["developer"] }) {
  return (
    <section id="developer" className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="reveal">
          <p className="eyebrow">12 / المطوّر</p>
          <h2 className="h2 mt-3">عن سوديك</h2>
          <p className="mt-5 text-[15.5px] leading-[1.95] text-ink/80">{d.about}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {d.facts.map((f) => (
              <li key={f} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">{f}</li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-3xl border border-line p-7">
          <h3 className="font-display text-lg font-bold text-ink">أبرز المشروعات</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            {d.projects.map((pr) => (
              <li key={pr.name} className="border-b border-line py-3 text-[15px] text-ink/85">
                {pr.href ? (
                  <Link href={pr.href} className="inline-flex items-center gap-1.5 font-semibold text-gold underline-offset-4 hover:underline">
                    {pr.name} <span aria-hidden="true">←</span>
                  </Link>
                ) : pr.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
