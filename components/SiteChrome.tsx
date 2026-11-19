"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Keeps the marketing nav/footer on regular pages, but lets full-screen
 * experiences (like the live scan HUD) take over the whole viewport.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare =
    pathname === "/scan/live" ||
    pathname.startsWith("/scan/live/") ||
    pathname === "/command" ||
    pathname.startsWith("/command/");

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
