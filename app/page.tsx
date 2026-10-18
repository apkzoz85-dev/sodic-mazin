import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Overview, { KeyFacts } from "@/components/Overview";
import Units from "@/components/Units";
import PriceRequest from "@/components/PriceRequest";
import PaymentPlan from "@/components/PaymentPlan";
import Calculator from "@/components/Calculator";
import FloorPlans from "@/components/FloorPlans";
import Gallery from "@/components/Gallery";
import Brochure from "@/components/Brochure";
import Amenities from "@/components/Amenities";
import Location from "@/components/Location";
import { Developer, Why } from "@/components/Why";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { FAQ, SITE, UNITS } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.agent,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    areaServed: "Cairo, Egypt",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SODIC East — سوديك إيست",
    brand: { "@type": "Brand", name: "SODIC" },
    description: "شقق ودوبلكس وتاون هاوس وفيلات في هليوبوليس الجديدة بمقدم 1.5% وتقسيط حتى 10 سنوات.",
    image: `${SITE.url}/images/og.jpg`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EGP",
      lowPrice: Math.min(...UNITS.map((u) => u.price)),
      highPrice: Math.max(...UNITS.map((u) => u.price)),
      offerCount: UNITS.length,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">انتقل إلى المحتوى</a>
      <Header />
      <main id="main">
        <Hero />
        <KeyFacts />
        <Overview />
        <Units />
        <PriceRequest />
        <PaymentPlan />
        <Calculator />
        <FloorPlans />
        <Gallery />
        <Brochure />
        <Amenities />
        <Location />
        <Why />
        <Developer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Overlays />
    </>
  );
}
