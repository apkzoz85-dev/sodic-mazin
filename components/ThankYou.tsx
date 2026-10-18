import Link from "next/link";
import { SITE, waLink } from "@/lib/site";
import type { Project } from "@/lib/types";

export default function ThankYou({ p }: { p: Project }) {
  return (
    <main style={p.theme as React.CSSProperties} className="grid min-h-svh place-items-center bg-cream px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl shadow-ink/10 ring-1 ring-line sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-gold-soft">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink">شكرًا، طلبك وصل!</h1>
        <p className="mt-3 leading-relaxed text-muted">مستشار من فريق {SITE.agent} هيتواصل معاك قريب بآخر أسعار {p.name} والوحدات المتاحة.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={waLink(`مرحبًا، لسه باعت بياناتي من صفحة ${p.name} وعايز أكمل على واتساب.`)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">كمّل على واتساب</a>
          <Link href={p.path} className="btn btn-ghost text-ink">رجوع للصفحة</Link>
        </div>
      </div>
    </main>
  );
}
