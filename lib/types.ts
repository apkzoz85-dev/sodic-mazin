export type Fact = { label: string; value: string };
export type Stat = { value: string; unit: string; label: string };

export type Unit = {
  id: string;
  phase: string; // اسم التاب (المرحلة / الشقق / الفيلات…)
  title: string;
  area: string;
  beds?: string;
  kind?: string; // يظهر بدل "غرف النوم" لو مفيش beds
  delivery?: string;
  finishing: string;
  priceLabel: string; // "6.7 مليون" أو "22 – 25 مليون"
  price: number; // أقل سعر — للحاسبة و JSON-LD
  image?: string; // من غيرها بيظهر كارت بألوان البراند
  fallbackLabel?: string; // النص اللاتيني الصغير في الكارت البديل
  tag?: string;
  plan?: { image: string; caption: string }; // مخطط حقيقي من البروشور
};

export type Plan = { id: string; label: string; down: number; years: number; note: string };

export type Project = {
  slug: string;
  path: string; // "/" أو "/the-estates"
  name: string;
  nameEn: string;
  logoLetter: string;
  logoName?: string; // اسم أقصر للوجو على الموبايل
  theme?: Record<string, string>; // override لألوان الـ CSS (--color-ink …)
  themeColor: string;

  seo: { title: string; description: string; keywords: string[]; og: string };
  waMsg: string;
  nav: { href: string; label: string }[];

  hero: { eyebrow: string; title: string; lead: string; facts: Fact[]; image: string; imageAlt: string; formTitle: string };
  keyFacts: Fact[];
  overview: { heading: string; paragraphs: string[]; image: string; imageAlt: string; stats: Stat[] };
  unitsIntro: string;
  priceMode: "from" | "avg"; // "يبدأ من" أو "متوسط السعر"
  units: Unit[];
  priceBullets: string[];
  payment: {
    subtitle: string;
    steps: { big: string; t: string; d: string }[];
    alt?: string;
    note: string;
  };
  plans: Plan[];
  calcNote: string;
  gallery: { src: string; cat: string; alt: string }[];
  brochure: { image: string; bullets: string[] };
  amenities: { heading: string; list: string[]; images: { src: string; alt: string }[] };
  location: {
    heading: string;
    address: string;
    times: { min: number; place: string }[];
    near: string[];
    mapImage?: string;
    mapAlt?: string;
    mapQuery: string;
  };
  why: { heading: string; items: { t: string; d: string }[] };
  developer: { about: string; facts: string[]; projects: { name: string; href?: string }[] };
  faq: { q: string; a: string }[];
  final: { eyebrow: string; bg: string };
  popup: { badge: string; title: string; text: string };
  footerBlurb: string;
};
