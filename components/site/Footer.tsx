import Link from "next/link";
import {
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { SiteSetting } from "@/payload-types";

// One entry per field in Site Settings → Contact & Social.
const SOCIALS = {
  github: { label: "GitHub", icon: Github },
  linkedin: { label: "LinkedIn", icon: Linkedin },
  twitter: { label: "X (Twitter)", icon: Twitter },
  instagram: { label: "Instagram", icon: Instagram },
  dribbble: { label: "Dribbble", icon: Dribbble },
} as const satisfies Record<string, { label: string; icon: LucideIcon }>;

type SocialLink = { label: string; href: string; icon: LucideIcon };

/** The social links that have a URL filled in, in a fixed order. */
export function socialLinks(settings: SiteSetting): SocialLink[] {
  return (Object.keys(SOCIALS) as (keyof typeof SOCIALS)[]).flatMap((key) => {
    const href = settings.social?.[key]?.trim();
    return href ? [{ ...SOCIALS[key], href }] : [];
  });
}

export function Footer({ settings }: { settings: SiteSetting }) {
  const socials = socialLinks(settings);

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {settings.ownerName || settings.siteName}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {socials.length > 0 && (
            <ul className="flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Link href="/contact" className="transition-colors hover:text-fg">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
