import Image from "next/image";
import { KEY_FACTS, OVERVIEW_STATS } from "@/lib/site";
import { LeadButton, WaButton } from "./ContactLinks";

export function KeyFacts() {
  return (
    <section aria-label="أهم المعلومات" className="border-b border-line bg-cream">
      <div className="container-x">
        <dl className="no-scrollbar -mx-4 flex snap-x overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:px-0">
          {KEY_FACTS.map((f) => (
            <div key={f.label} className="min-w-[44%] snap-start border-l border-line px-4 py-6 last:border-l-0 sm:min-w-[30%] md:min-w-0">
              <dt className="text-xs text-muted">{f.label}</dt>
              <dd className="mt-1.5 text-[15px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function Overview() {
  return (
    <section id="overview" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="eyebrow">01 / نظرة عامة</p>
          <h2 className="h2 mt-3">مجتمع أخضر للمشي والحياة الهادية في شرق القاهرة.</h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.95] text-ink/80">
            <p>
              سوديك إيست ممتد على حوالي 655 فدان في هليوبوليس الجديدة، بين طريقي القاهرة–السويس والقاهرة–الإسماعيلية وملاصق لمدينة الشروق.
              الماستر بلان من ساساكي واللاندسكيب من كراكنل، والأحياء متوزعة حوالين وديان خضرا مفتوحة ومسارات للمشي والدراجات ونادي رياضي.
            </p>
            <p>
              المرحلة الجديدة فيها شقق من 76 م² (من غرفة لـ 4 غرف) ودوبلكس 3 غرف بتشطيب Flexi، بأسعار من 6.7 مليون جنيه ومقدم 1.5% وتقسيط لحد 10 سنين.
              ومتاح كمان تاون هاوس وفيلات مستقلة في ميدوز.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LeadButton source="overview">اعرف الوحدات المتاحة</LeadButton>
            <WaButton className="btn btn-ghost text-wa" />
          </div>
        </div>

        <div className="reveal">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/overview.webp" alt="المساحات الخضراء في سوديك إيست" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {OVERVIEW_STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line p-4">
                <dd className="font-display text-2xl font-bold text-ink">
                  <span className="num">{s.value}</span> <span className="text-sm font-semibold text-gold">{s.unit}</span>
                </dd>
                <dt className="mt-1 text-xs leading-relaxed text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
