import LeadForm from "./LeadForm";
import { IconCheck } from "./Icons";

export default function PriceRequest() {
  return (
    <section id="prices" className="relative overflow-hidden bg-ink py-20 text-white md:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow !text-gold-soft">03 / الأسعار والمتاح</p>
          <h2 className="h2 mt-3 !text-white">خُد آخر أسعار ووحدات متاحة النهارده</h2>
          <ul className="mt-7 space-y-3.5 text-white/85">
            {["قائمة أسعار محدّثة لكل أنواع الوحدات", "الوحدات المتاحة حاليًا في المرحلة الجديدة وميدوز", "شرح أنظمة السداد وأفضل نظام يناسبك"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-soft"><IconCheck /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/15 backdrop-blur sm:p-8">
          <LeadForm source="prices" showEmail dark submitLabel="ابعتلي الأسعار" />
        </div>
      </div>
    </section>
  );
}
