import type { Metadata } from "next";
import LiveScanScreen from "@/components/LiveScanScreen";

export const metadata: Metadata = {
  title: "Live scan HUD",
  description:
    "A live, tactical view of the Cyber Detector heuristic scan: radar scope, telemetry tiles, engine logs and scan controls.",
};

export default function LiveScanPage() {
  return <LiveScanScreen />;
}
