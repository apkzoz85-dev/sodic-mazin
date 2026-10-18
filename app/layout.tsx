import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";

const title = "سوديك إيست هليوبوليس الجديدة | شقق من 6.7 مليون — مقدم 1.5% على 10 سنوات";
const description =
  "سوديك إيست في هليوبوليس الجديدة: شقق من غرفة لـ 4 غرف ودوبلكس وتاون هاوس وفيلات. أسعار تبدأ من 6.7 مليون جنيه، مقدم 1.5% وتقسيط حتى 10 سنوات. اطلب آخر الأسعار والمتاح من وكيل معتمد.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "سوديك إيست", "سوديك ايست", "SODIC East", "اسعار سوديك ايست", "سوديك ايست هليوبوليس الجديدة",
    "شقق سوديك ايست", "ميدوز سوديك ايست", "كمبوند سوديك الشروق", "مقدم 1.5% سوديك",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1e3d50",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const gtagOn = !SITE.gtagId.includes("XXXX");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@600;700;800&display=swap"
        />
      </head>
      <body>
        {children}
        {gtagOn && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gtagId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gtagId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
