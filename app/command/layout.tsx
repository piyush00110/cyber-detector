import type { Metadata } from "next";
import "./command.css";
import CommandShell from "@/components/command/CommandShell";

export const metadata: Metadata = {
  title: "Command Center",
  description:
    "CyberDetector command center: live shield integrity, threat telemetry, network defense and scanner controls.",
};

export default function CommandLayout({ children }: { children: React.ReactNode }) {
  return <CommandShell>{children}</CommandShell>;
}
