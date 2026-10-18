"use client";

import { SITE, waLink } from "@/lib/site";
import { track, openLead } from "@/lib/track";
import { IconPhone, IconWa } from "./Icons";
import { useProject } from "./ProjectContext";

export function WaButton({ msg, className = "btn btn-wa", children }: { msg?: string; className?: string; children?: React.ReactNode }) {
  const p = useProject();
  return (
    <a href={waLink(msg ?? p.waMsg)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp")} className={className}>
      <IconWa className="h-5 w-5" />
      {children ?? "واتساب"}
    </a>
  );
}

export function CallButton({ className = "btn btn-ghost", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={`tel:${SITE.phoneTel}`} onClick={() => track("call")} className={className}>
      <IconPhone className="h-5 w-5" />
      {children ?? <span className="num">{SITE.phoneDisplay}</span>}
    </a>
  );
}

export function LeadButton({ source, unit, title, className = "btn btn-primary", children }: { source: string; unit?: string; title?: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => openLead({ source, unit, title })} className={className}>
      {children}
    </button>
  );
}
