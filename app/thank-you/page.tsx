import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";
import { sodicEast } from "@/lib/projects/sodic-east";

export const metadata: Metadata = {
  title: "تم استلام طلبك | سوديك إيست",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYou p={sodicEast} />;
}
