"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE, waLink } from "@/lib/site";
import { track, openLead } from "@/lib/track";
import LeadForm from "./LeadForm";
import { IconClose, IconPhone, IconWa } from "./Icons";

/* ---------------- safe storage ---------------- */
const store = {
  get: (k: string, s: "local" | "session" = "local") => {
    try { return (s === "local" ? localStorage : sessionStorage).getItem(k); } catch { return null; }
  },
  set: (k: string, v: string, s: "local" | "session" = "local") => {
    try { (s === "local" ? localStorage : sessionStorage).setItem(k, v); } catch { /* ignore */ }
  },
};

/* ---------------- generic modal shell ---------------- */
function Modal({ onClose, children, label }: { onClose: () => void; children: React.ReactNode; label: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-deep/70 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={label}>
      <div className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-md sm:rounded-3xl sm:p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream text-ink" aria-label="إغلاق"><IconClose className="h-4 w-4" /></button>
        {children}
      </div>
    </div>
  );
}

/* ---------------- lead modal (opened from any CTA) ---------------- */
function LeadModal() {
  const [state, setState] = useState<{ source: string; unit?: string; title?: string } | null>(null);
  useEffect(() => {
    const h = (e: Event) => setState((e as CustomEvent).detail);
    window.addEventListener("open-lead", h);
    return () => window.removeEventListener("open-lead", h);
  }, []);
  const close = useCallback(() => setState(null), []);
  if (!state) return null;
  return (
    <Modal onClose={close} label="طلب الأسعار">
      <p className="text-xs font-semibold text-gold">سوديك إيست · هليوبوليس الجديدة</p>
      <p className="mt-1 font-display text-xl font-bold text-ink">{state.title || "احصل على آخر الأسعار"}</p>
      <p className="mb-5 mt-1 text-sm text-muted">سيب رقمك ومستشار هيكلمك خلال دقائق في مواعيد العمل.</p>
      <LeadForm source={`modal-${state.source}`} unit={state.unit} showUnit={!state.unit} />
    </Modal>
  );
}

/* ---------------- timed / scroll popup ---------------- */
function LeadPopup() {
  const [show, setShow] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (store.get("se_popup", "session")) return;
    const fire = () => {
      if (fired.current) return;
      if (document.querySelector('[role="dialog"]')) return; // don't stack on another modal
      fired.current = true;
      store.set("se_popup", "1", "session");
      setShow(true);
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if ((h.scrollTop + h.clientHeight) / h.scrollHeight >= 0.55) fire();
    };
    const t = window.setTimeout(fire, 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => { window.clearTimeout(t); window.removeEventListener("scroll", onScroll); };
    return cleanup;
  }, []);

  const close = useCallback(() => setShow(false), []);
  if (!show) return null;
  return (
    <Modal onClose={close} label="عرض خاص">
      <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">مقدم 1.5% فقط</span>
      <p className="mt-3 font-display text-2xl font-bold text-ink">ابدأ بـ 100 ألف تقريبًا وقسّط على 10 سنين</p>
      <p className="mb-5 mt-2 text-sm text-muted">احجز شقتك في المرحلة الجديدة من سوديك إيست قبل تحريك الأسعار. خُد قائمة الأسعار والمتاح الآن.</p>
      <LeadForm source="popup" showUnit submitLabel="ابعتلي الأسعار والمتاح" />
    </Modal>
  );
}

/* ---------------- legal modals ---------------- */
function LegalModal() {
  const [doc, setDoc] = useState<"privacy" | "disclaimer" | null>(null);
  useEffect(() => {
    const h = (e: Event) => setDoc((e as CustomEvent).detail);
    window.addEventListener("open-legal", h);
    return () => window.removeEventListener("open-legal", h);
  }, []);
  const close = useCallback(() => setDoc(null), []);
  if (!doc) return null;
  return (
    <Modal onClose={close} label={doc === "privacy" ? "سياسة الخصوصية" : "إخلاء المسؤولية"}>
      {doc === "privacy" ? (
        <div className="space-y-3 text-sm leading-relaxed text-ink/80">
          <p className="font-display text-xl font-bold text-ink">سياسة الخصوصية</p>
          <p>تُدار هذه الصفحة بواسطة {SITE.agent}، وكيل مبيعات عقاري معتمد. نجمع فقط البيانات التي تُدخلها بنفسك (الاسم، رقم الهاتف، البريد الإلكتروني الاختياري، والوحدة المهتم بها) بغرض التواصل معك بخصوص مشروع سوديك إيست.</p>
          <p>لا نبيع بياناتك لأي طرف ثالث. قد نشارك بياناتك مع المطوّر (سوديك) لغرض إتمام الحجز فقط وبعد موافقتك.</p>
          <p>نستخدم ملفات تعريف الارتباط (Cookies) وأدوات قياس مثل Google Ads وGoogle Analytics لقياس أداء الإعلانات وتحسين تجربة الصفحة.</p>
          <p>لطلب حذف بياناتك أو تعديلها راسلنا على: <span dir="ltr">{SITE.email}</span></p>
        </div>
      ) : (
        <div className="space-y-3 text-sm leading-relaxed text-ink/80">
          <p className="font-display text-xl font-bold text-ink">إخلاء المسؤولية</p>
          <p>هذه الصفحة ليست الموقع الرسمي لشركة سوديك، وتديرها {SITE.agent} بصفتها وكيل مبيعات معتمد.</p>
          <p>جميع الأسعار والمساحات وخطط السداد ومواعيد الاستلام المذكورة أسعار استرشادية وقابلة للتغيير من المطوّر دون إشعار، ولا تُعد عرضًا أو تعاقدًا ملزمًا. يتم التعاقد النهائي مع المطوّر مباشرة.</p>
          <p>الصور والتصميمات تصورات فنية لأغراض توضيحية فقط وقد تختلف عن الواقع.</p>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- cookie consent ---------------- */
function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!store.get("se_cookie")) setShow(true); }, []);
  if (!show) return null;
  const accept = (v: string) => { store.set("se_cookie", v); setShow(false); };
  return (
    <div className="fixed inset-x-3 bottom-[84px] z-[60] mx-auto max-w-xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-line md:bottom-5">
      <p className="text-sm leading-relaxed text-ink/80">
        بنستخدم ملفات الكوكيز لتحسين تجربتك وقياس أداء الإعلانات.{" "}
        <button onClick={() => window.dispatchEvent(new CustomEvent("open-legal", { detail: "privacy" }))} className="font-semibold text-ink underline underline-offset-4">سياسة الخصوصية</button>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => accept("all")} className="btn btn-primary !px-5 !py-2 text-sm">موافق</button>
        <button onClick={() => accept("essential")} className="btn !px-5 !py-2 text-sm text-ink ring-1 ring-line">الضرورية فقط</button>
      </div>
    </div>
  );
}

/* ---------------- mobile bottom bar + floating desktop WA ---------------- */
function ContactBars() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <a href={`tel:${SITE.phoneTel}`} onClick={() => track("call")} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-ink">
          <IconPhone /> اتصل
        </a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp")} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-wa">
          <IconWa /> واتساب
        </a>
        <button onClick={() => openLead({ source: "mobile-bar" })} className="m-1.5 rounded-xl bg-gold text-sm font-bold text-white">
          اطلب الأسعار
        </button>
      </div>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp")}
        className="fixed bottom-6 left-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-xl shadow-black/20 transition hover:scale-105 md:grid"
        aria-label="تواصل واتساب"
      >
        <IconWa className="h-7 w-7" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-wa/40" />
      </a>
    </>
  );
}

/* ---------------- scroll reveal ---------------- */
function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

export default function Overlays() {
  return (
    <>
      <Reveal />
      <ContactBars />
      <LeadModal />
      <LeadPopup />
      <LegalModal />
      <CookieConsent />
    </>
  );
}
