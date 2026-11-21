import Link from "next/link";
import type { SiteSetting } from "@/payload-types";

const SOCIAL_LABELS = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
  dribbble: "Dribbble",
} as const;

export function socialLinks(settings: SiteSetting) {
  return (Object.keys(SOCIAL_LABELS) as (keyof typeof SOCIAL_LABELS)[])
    .map((key) => ({ label: SOCIAL_LABELS[key], href: settings.social?.[key] }))
    .filter((link): link is { label: (typeof SOCIAL_LABELS)[keyof typeof SOCIAL_LABELS]; href: string } =>
      Boolean(link.href),
    );
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const socials = socialLinks(settings);

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {settings.ownerName || settings.siteName}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
          <Link href="/contact" className="transition-colors hover:text-fg">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
