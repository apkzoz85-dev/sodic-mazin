import Image from "next/image";
import type { Project } from "@/lib/types";
import LeadForm from "./LeadForm";
import { CallButton, WaButton } from "./ContactLinks";

export default function FinalCta({ p }: { p: Project }) {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink-deep py-20 text-white md:py-28">
      <Image src={p.final.bg} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow !text-gold-soft">{p.final.eyebrow}</p>
          <h2 className="h2 mt-3 !text-white">مهتم بـ{p.name}؟</h2>
          <p className="mt-4 max-w-md text-white/80">سيب بياناتك ومستشار عقاري هيكلمك بالأسعار والمتاح وخطة السداد اللي تناسبك.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WaButton />
            <CallButton className="btn btn-ghost text-white" />
          </div>
        </div>
        <div className="reveal rounded-3xl bg-white p-6 text-ink sm:p-8">
          <p className="font-display text-xl font-bold">اطلب مكالمة أو احجز معاينة</p>
          <div className="mt-5">
            <LeadForm source="final" showUnit showEmail />
          </div>
        </div>
      </div>
    </section>
  );
}
