import Link from "next/link";

const links = [
  { href: "/scan", label: "URL Scanner" },
  { href: "/analyze", label: "Code & Files" },
  { href: "/learn", label: "Learn" },
  { href: "/api-docs", label: "API Docs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="logo">
          🛡️ Cyber Detector
        </Link>
        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href="/#scanner" className="nav-cta">
            Scan now
          </Link>
        </nav>
      </div>
    </header>
  );
}
