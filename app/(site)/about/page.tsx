import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { asMedia, getResume, getSettings, mediaUrl } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [settings, resume] = await Promise.all([getSettings(), getResume()]);

  const profile = asMedia(settings.profileImage);
  const profileSrc = mediaUrl(profile, "card") ?? "/images/my-profile.png";
  const paragraphs = (settings.bio ?? "").split(/\n+/).filter(Boolean);
  const stats = settings.stats ?? [];
  const experience = resume.experience ?? [];

  return (
    <div className="container-site py-16 sm:py-20">
      <Reveal>
      <p className="eyebrow">About</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
        {settings.ownerName}
      </h1>
      {settings.ownerTitle && (
        <p className="mt-4 text-lg text-muted">{settings.ownerTitle}</p>
      )}
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[20rem_1fr]">
        <Reveal className="space-y-4">
          <div className="card relative aspect-[4/5] overflow-hidden">
            <Image
              src={profileSrc}
              alt={profile?.alt || settings.ownerName || "Profile photo"}
              fill
              priority
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover"
            />
          </div>
          {settings.location && (
            <p className="card flex items-center gap-3 px-5 py-4 text-sm">
              <MapPin className="h-4 w-4 text-accent" />
              {settings.location}
            </p>
          )}
        </Reveal>

        <div className="min-w-0">
          {paragraphs.length > 0 && (
            <Stagger className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              {paragraphs.map((paragraph) => (
                <StaggerItem as="p" key={paragraph}>
                  {paragraph}
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {stats.length > 0 && (
            <Stagger
              as="dl"
              className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <StaggerItem key={stat.id ?? stat.label}>
                  <dd className="font-display text-4xl font-semibold">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {experience.length > 0 && (
            <section className="mt-12">
              <h2 className="eyebrow">Experience</h2>
              <Stagger as="ul" className="mt-6 space-y-6">
                {experience.map((job) => (
                  <StaggerItem
                    as="li"
                    key={job.id ?? job.title}
                    className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm text-muted">{job.period}</p>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted">
                        {[job.company, job.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
