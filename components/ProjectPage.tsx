import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import type { Project } from "@/lib/types";
import { ProjectProvider } from "./ProjectContext";
import Header from "./Header";
import Hero from "./Hero";
import Overview, { KeyFacts } from "./Overview";
import Units from "./Units";
import PriceRequest from "./PriceRequest";
import PaymentPlan from "./PaymentPlan";
import Calculator from "./Calculator";
import FloorPlans from "./FloorPlans";
import Gallery from "./Gallery";
import Brochure from "./Brochure";
import Amenities from "./Amenities";
import Location from "./Location";
import { Developer, Why } from "./Why";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import Overlays from "./Overlays";

const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;

export function projectMetadata(p: Project): Metadata {
  const { title, description, keywords, og } = p.seo;
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords,
    alternates: { canonical: p.path },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
    openGraph: { type: "website", locale: "ar_EG", url: abs(p.path), siteName: p.name, title, description, images: [{ url: og, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    icons: { icon: "/favicon.svg" },
  };
}

export function projectViewport(p: Project): Viewport {
  return { themeColor: p.themeColor, width: "device-width", initialScale: 1, viewportFit: "cover" };
}

export default function ProjectPage({ p }: { p: Project }) {
  const prices = p.units.map((u) => u.price);
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "RealEstateAgent", name: SITE.agent, url: abs(p.path), telephone: SITE.phoneTel, email: SITE.email, areaServed: "Cairo, Egypt" },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${p.nameEn} — ${p.name}`,
      brand: { "@type": "Brand", name: "SODIC" },
      description: p.seo.description,
      image: `${SITE.url}${p.seo.og}`,
      offers: { "@type": "AggregateOffer", priceCurrency: "EGP", lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: p.units.length },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  const logo = { name: p.logoName ?? p.name, nameEn: p.nameEn, letter: p.logoLetter };

  return (
    <ProjectProvider
      value={{ slug: p.slug, path: p.path, name: p.name, waMsg: p.waMsg, units: p.units.map((u) => ({ title: u.title, area: u.area })), popup: p.popup }}
    >
      <div style={p.theme as React.CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">انتقل إلى المحتوى</a>
        <Header nav={p.nav} logo={logo} />
        <main id="main">
          <Hero p={p} />
          <KeyFacts p={p} />
          <Overview p={p} />
          <Units units={p.units} intro={p.unitsIntro} priceMode={p.priceMode} />
          <PriceRequest bullets={p.priceBullets} />
          <PaymentPlan p={p} />
          <Calculator units={p.units} plans={p.plans} note={p.calcNote} />
          <FloorPlans units={p.units} priceMode={p.priceMode} />
          <Gallery items={p.gallery} />
          <Brochure p={p} />
          <Amenities a={p.amenities} />
          <Location l={p.location} />
          <Why w={p.why} />
          <Developer d={p.developer} />
          <Faq items={p.faq} />
          <FinalCta p={p} />
        </main>
        <Footer logo={logo} blurb={p.footerBlurb} current={p.path} />
        <Overlays />
      </div>
    </ProjectProvider>
  );
}
