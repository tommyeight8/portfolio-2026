import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ siteName }: { siteName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display font-semibold"
        >
          <Image src="/images/portfolio-logo.png" alt="" width={28} height={28} />
          <span className="hidden sm:inline">{siteName}</span>
        </Link>
        <nav className="flex items-center text-sm sm:gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-2 py-1.5 text-muted transition-colors hover:text-fg sm:px-3"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
