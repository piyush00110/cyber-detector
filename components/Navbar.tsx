"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/scan", label: "URL Scanner" },
  { href: "/analyze", label: "Code & Files" },
  { href: "/history", label: "History" },
  { href: "/learn", label: "Learn" },
  { href: "/api-docs", label: "API Docs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="logo">
          🛡️ Cyber Detector
        </Link>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-tools">
          <ThemeToggle />
          <Link href="/#scanner" className="nav-cta">
            Scan now
          </Link>
          <button
            type="button"
            className="icon-btn burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      <nav className={`mobile-menu${open ? " open" : ""}`} aria-label="Mobile">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={isActive(l.href) ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
