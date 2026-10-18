import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  icons: { icon: "/favicon.svg" },
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
