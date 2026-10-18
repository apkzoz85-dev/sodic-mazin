import Image from "next/image";
import type { Project } from "@/lib/types";
import { LeadButton, WaButton } from "./ContactLinks";
import { IconCheck, IconDownload } from "./Icons";

export default function Brochure({ p }: { p: Project }) {
  return (
    <section id="brochure" className="overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rotate-3 sm:-inset-6 rounded-3xl bg-sand" aria-hidden="true" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl shadow-ink/25">
            <Image src={p.brochure.image} alt={`بروشور ${p.name}`} fill sizes="384px" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink-deep/90 via-ink-deep/20 to-transparent p-6 text-white">
              <p className="text-xs tracking-[.25em] text-gold-soft">SODIC · 2026</p>
              <p className="mt-1 font-display text-2xl font-bold">{p.name}</p>
              <p className="text-sm text-white/75">البروشور الكامل</p>
            </div>
          </div>
        </div>

        <div className="reveal">
          <p className="eyebrow">08 / البروشور</p>
          <h2 className="h2 mt-3">حمّل بروشور {p.name}</h2>
          <ul className="mt-6 space-y-3 text-ink/80">
            {p.brochure.bullets.map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/10 text-ink"><IconCheck className="h-3.5 w-3.5" /></span>{t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <LeadButton source="brochure" title="ابعتلي البروشور"><IconDownload /> احصل على البروشور</LeadButton>
            <WaButton msg={`مرحبًا، ابعتلي بروشور ${p.name}.`} className="btn btn-ghost text-wa" />
          </div>
        </div>
      </div>
    </section>
  );
}
