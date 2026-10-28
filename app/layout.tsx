import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: {
    default: "Cyber Detector — URL, Virus & Malicious Code Scanner",
    template: "%s · Cyber Detector",
  },
  description:
    "Free URL phishing scanner, ClamAV-backed virus/file checker and malicious-code analyzer. History in localStorage. No signup.",
};

/** Applies the saved theme before first paint so there is no flash. */
const THEME_BOOT = `(function(){try{var t=localStorage.getItem("cyber-detector-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
