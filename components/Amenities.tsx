import Image from "next/image";
import { AMENITIES } from "@/lib/site";

const IMGS = [
  { src: "/images/lagoon.webp", alt: "لاجون صالح للسباحة بشاطئ رملي" },
  { src: "/images/water-garden.webp", alt: "حديقة المياه ومسارات المشي" },
  { src: "/images/hero.webp", alt: "بار حمام السباحة ومناطق الاسترخاء" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-ink-deep py-20 text-white md:py-28">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="eyebrow !text-gold-soft">09 / الخدمات</p>
          <h2 className="h2 mt-3 !text-white">كل اللي محتاجه جوه الكمبوند</h2>
        </div>

        <ul className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 md:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <li key={a} className="flex items-center gap-3 bg-ink-deep px-4 py-5 text-[14.5px] text-white/85">
              <span className="font-display text-xs text-gold-soft/80">{String(i + 1).padStart(2, "0")}</span>
              {a}
            </li>
          ))}
        </ul>

        <div className="reveal mt-6 grid gap-3 md:grid-cols-3">
          {IMGS.map((im) => (
            <div key={im.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
