"use client";

import { createContext, useContext } from "react";

export type ProjectCtx = {
  slug: string;
  path: string;
  name: string;
  waMsg: string;
  units: { title: string; area: string }[];
  popup: { badge: string; title: string; text: string };
};

const Ctx = createContext<ProjectCtx | null>(null);

export function ProjectProvider({ value, children }: { value: ProjectCtx; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProject() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useProject must be used inside ProjectProvider");
  return v;
}

export const thankYouPath = (path: string) => (path === "/" ? "/thank-you" : `${path}/thank-you`);
