"use client";

import { SITE } from "@/lib/site";
import { Logo } from "./Header";
import { CallButton, WaButton } from "./ContactLinks";

const openModal = (id: "privacy" | "disclaimer") => window.dispatchEvent(new CustomEvent("open-legal", { detail: id }));

export default function Footer() {
  return (
    <footer className="bg-ink-deep pb-28 pt-14 text-white/75 md:pb-10">
      <div className="container-x">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">كمبوند متكامل على 655 فدان في هليوبوليس الجديدة — شقق ودوبلكس بخطة سداد حتى 10 سنين.</p>
          </div>
          <div>
            <p className="font-semibold text-white">استفسارات المبيعات</p>
            <div className="mt-4 flex flex-col items-start gap-2">
              <CallButton className="inline-flex items-center gap-2 text-sm text-white hover:text-gold-soft" />
              <WaButton className="inline-flex items-center gap-2 text-sm text-white hover:text-gold-soft" />
              <a href={`mailto:${SITE.email}`} className="text-sm hover:text-gold-soft">{SITE.email}</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">الوكيل</p>
            <p className="mt-4 text-sm leading-relaxed">
              تدار هذه الصفحة بواسطة <a href={SITE.agentSite} target="_blank" rel="noopener" className="text-gold-soft underline-offset-4 hover:underline">{SITE.agent}</a> — وكيل مبيعات معتمد لشركة سوديك.
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <button onClick={() => openModal("privacy")} className="hover:text-gold-soft">سياسة الخصوصية</button>
              <button onClick={() => openModal("disclaimer")} className="hover:text-gold-soft">إخلاء المسؤولية</button>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-white/50">
          هذه الصفحة ليست الموقع الرسمي للمطوّر. معلومات المشروع والأسعار وخطط السداد والوحدات المتاحة أسعار استرشادية قابلة للتغيير ولا تُعد عرضًا ملزمًا. الصور تصورات فنية لأغراض توضيحية.
        </p>
        <p className="mt-3 text-xs text-white/40">© {new Date().getFullYear()} {SITE.agent} · جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
