import type { Metadata } from "next";
import { socialLinks } from "@/components/site/Footer";
import { getSettings } from "@/lib/data";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSettings();
  const socials = socialLinks(settings);

  return (
    <div className="container-site py-16 sm:py-20">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
        Let&apos;s work together
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        Have a project in mind? Tell me about it and I&apos;ll get back to you.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <ContactForm />

        <aside className="space-y-8 text-sm">
          {settings.contactEmail && (
            <div>
              <h2 className="text-muted">Email</h2>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-1 block break-all font-medium hover:text-accent"
              >
                {settings.contactEmail}
              </a>
            </div>
          )}
          {settings.location && (
            <div>
              <h2 className="text-muted">Location</h2>
              <p className="mt-1 font-medium">{settings.location}</p>
            </div>
          )}
          {settings.availability && (
            <div>
              <h2 className="text-muted">Availability</h2>
              <p className="mt-1 font-medium">{settings.availability}</p>
            </div>
          )}
          {socials.length > 0 && (
            <div>
              <h2 className="text-muted">Elsewhere</h2>
              <ul className="mt-1 space-y-1">
                {socials.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
