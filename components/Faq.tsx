import { FAQ } from "@/lib/site";
import { WaButton } from "./ContactLinks";

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="reveal">
          <p className="eyebrow">13 / الأسئلة الشائعة</p>
          <h2 className="h2 mt-3">أسئلة بتتسأل كتير</h2>
          <p className="mt-4 text-muted">عندك سؤال تاني؟ فريقنا بيرد على واتساب.</p>
          <WaButton className="btn btn-wa mt-6">اسألنا على واتساب</WaButton>
        </div>
        <div className="reveal divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
          {FAQ.map((f, i) => (
            <details key={f.q} className="group px-6 py-1" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand text-ink transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
