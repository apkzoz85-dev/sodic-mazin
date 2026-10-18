"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";
import { track } from "@/lib/track";
import { thankYouPath, useProject } from "./ProjectContext";

type Props = {
  source: string;
  unit?: string;
  submitLabel?: string;
  showEmail?: boolean;
  showUnit?: boolean;
  dark?: boolean;
};

const normalizePhone = (v: string) => v.replace(/[\s\-()]/g, "").replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
const validPhone = (v: string) => {
  const p = normalizePhone(v);
  return /^01[0125]\d{8}$/.test(p) || /^\+\d{8,15}$/.test(p) || /^00\d{8,15}$/.test(p);
};

export default function LeadForm({ source, unit, submitLabel = "اطلب الأسعار", showEmail = false, showUnit = false, dark = false }: Props) {
  const router = useRouter();
  const project = useProject();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (name.length < 2) return setError("من فضلك اكتب اسمك.");
    if (!validPhone(phone)) return setError("رقم الموبايل غير صحيح. مثال: 010 1234 5678 — أو ضيف كود الدولة +.");

    setLoading(true);
    const payload = {
      access_key: SITE.web3formsKey,
      subject: `ليد جديد — ${project.name} (${source})`,
      from_name: `${project.name} Landing`,
      project: project.name,
      name,
      phone: normalizePhone(phone),
      email: String(fd.get("email") || ""),
      unit: String(fd.get("unit") || unit || "غير محدد"),
      source,
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (SITE.web3formsKey.startsWith("YOUR_")) {
        console.warn("[LeadForm] Web3Forms key not set — simulating success.", payload);
      } else {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "failed");
      }
      track("form");
      router.push(thankYouPath(project.path));
    } catch {
      setError("حصلت مشكلة في الإرسال. جرّب تاني أو كلمنا واتساب.");
      setLoading(false);
    }
  }

  const label = dark ? "text-white/80" : "text-ink/80";

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <label className={`mb-1.5 block text-sm font-medium ${label}`} htmlFor={`name-${source}`}>الاسم بالكامل</label>
        <input id={`name-${source}`} name="name" className="field" autoComplete="name" required />
      </div>
      <div>
        <label className={`mb-1.5 block text-sm font-medium ${label}`} htmlFor={`phone-${source}`}>رقم الموبايل</label>
        <input
          id={`phone-${source}`}
          name="phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          placeholder="010 1234 5678"
          className="field text-right placeholder:text-right"
          autoComplete="tel"
          required
        />
        <p className={`mt-1 text-xs ${dark ? "text-white/55" : "text-muted"}`}>من خارج مصر؟ اكتب الرقم بكود الدولة (+966 …)</p>
      </div>
      {showUnit && (
        <div>
          <label className={`mb-1.5 block text-sm font-medium ${label}`} htmlFor={`unit-${source}`}>الوحدة المهتم بيها</label>
          <select id={`unit-${source}`} name="unit" className="field" defaultValue={unit || ""}>
            <option value="">لسه بحدد</option>
            {project.units.map((u) => (
              <option key={u.title} value={u.title}>{u.title} — {u.area}</option>
            ))}
          </select>
        </div>
      )}
      {!showUnit && unit && <input type="hidden" name="unit" value={unit} />}
      {showEmail && (
        <div>
          <label className={`mb-1.5 block text-sm font-medium ${label}`} htmlFor={`email-${source}`}>البريد الإلكتروني (اختياري)</label>
          <input id={`email-${source}`} name="email" type="email" dir="ltr" className="field text-right" autoComplete="email" />
        </div>
      )}
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-gold w-full disabled:opacity-60">
        {loading ? "جارِ الإرسال…" : submitLabel}
      </button>
      <p className={`text-center text-[11px] leading-relaxed ${dark ? "text-white/50" : "text-muted"}`}>
        بإرسال بياناتك بتوافق إن مستشار يتواصل معاك بخصوص المشروع — بدون أي التزام بالحجز.
      </p>
    </form>
  );
}
