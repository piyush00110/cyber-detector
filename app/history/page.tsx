import type { Metadata } from "next";
import HistoryPage from "@/components/HistoryPage";

export const metadata: Metadata = { title: "Scan history" };

export default function HistoryRoute() {
  return <HistoryPage />;
}
