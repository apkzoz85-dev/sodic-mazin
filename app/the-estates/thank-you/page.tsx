import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";
import { theEstates } from "@/lib/projects/the-estates";

export const metadata: Metadata = {
  title: "تم استلام طلبك | ذا استيتس ريزيدنسز",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYou p={theEstates} />;
}
