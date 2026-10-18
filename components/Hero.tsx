import Image from "next/image";
import { SITE } from "@/lib/site";
import type { Project } from "@/lib/types";
import LeadForm from "./LeadForm";
import { CallButton, WaButton } from "./ContactLinks";
import { IconShield } from "./Icons";

export default function Hero({ p }: { p: Project }) {
  const h = p.hero;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink-deep text-white">
      <Image src={h.image} alt={h.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-l from-ink-deep/90 via-ink-deep/60 to-ink-deep/20" />

      <div className="container-x grid min-h-[100svh] items-center gap-10 pb-14 pt-28 lg:grid-cols-[1.15fr_.85fr] lg:pt-32">
        <div>
          <p className="eyebrow !text-gold-soft">{h.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6.4vw,4.5rem)] font-extrabold leading-[1.12]">{h.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{h.lead}</p>

          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15 sm:grid-cols-4">
            {h.facts.map((f) => (
              <div key={f.label} className="bg-ink-deep/60 px-4 py-4 backdrop-blur-sm">
                <dt className="text-xs text-white/60">{f.label}</dt>
                <dd className="mt-1 font-display text-lg font-bold text-gold-soft">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WaButton>كلّم المبيعات واتساب</WaButton>
            <CallButton className="btn btn-ghost text-white" />
          </div>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs text-white/80 ring-1 ring-white/15">
            <IconShield className="h-4 w-4 text-gold-soft" />
            {SITE.agent} — وكيل مبيعات معتمد لسوديك
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-7">
          <p className="font-display text-xl font-bold">{h.formTitle}</p>
          <p className="mb-5 mt-1 text-sm text-muted">الأسعار والمتاح وخطط السداد — توصلك على موبايلك.</p>
          <LeadForm source="hero" showUnit />
        </div>
      </div>
    </section>
  );
}
