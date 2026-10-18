import { SITE } from "./site";

type Kind = "form" | "whatsapp" | "call";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const gtagReady = () => !SITE.gtagId.includes("XXXX");

export function track(kind: Kind) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `lead_${kind}` });
    if (gtagReady() && window.gtag) {
      window.gtag("event", "conversion", { send_to: `${SITE.gtagId}/${SITE.conversions[kind]}` });
    }
  } catch {
    /* ignore */
  }
}

export function openLead(detail: { source: string; unit?: string; title?: string }) {
  window.dispatchEvent(new CustomEvent("open-lead", { detail }));
}
