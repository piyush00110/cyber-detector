import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cyber Detector — URL, Virus & Malicious Code Scanner",
    template: "%s · Cyber Detector",
  },
  description:
    "Free URL phishing scanner, in-browser virus/file checker and malicious-code analyzer. History in localStorage. No signup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
