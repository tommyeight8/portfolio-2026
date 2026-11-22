import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { socialLinks } from "@/components/site/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { getResume, getSettings, mediaUrl } from "@/lib/data";

export const metadata: Metadata = { title: "Resume" };

// Used until a resume file is uploaded in the admin (Site → Resume).
const FALLBACK_FILE = "/Tommy_Vong_Senior_Full_Stack_Engineer.docx";

/** "Problem: Shopify offers…" → bold "Problem:" followed by the rest. */
function Point({ text }: { text: string }) {
  const match = /^([A-Z][A-Za-z /&-]{1,24}):\s+(.*)$/s.exec(text);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-medium text-fg">{match[1]}:</strong> {match[2]}
    </>
  );
}

export default async function ResumePage() {
  const [resume, settings] = await Promise.all([getResume(), getSettings()]);
  const fileUrl = mediaUrl(resume.file) ?? FALLBACK_FILE;

  const experience = resume.experience ?? [];
  const projects = resume.projects ?? [];
  const skillGroups = resume.skillGroups ?? [];
  const education = resume.education ?? [];
  const socials = socialLinks(settings);

  return (
    <div className="container-site py-16 sm:py-20">
      <Reveal
        as="header"
        className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="min-w-0">
          <p className="eyebrow">Resume</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">
            {settings.ownerName}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted">
            {resume.headline || settings.ownerTitle}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {settings.location && <li>{settings.location}</li>}
            {settings.contactEmail && (
              <li>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="break-all transition-colors hover:text-accent"
                >
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {socials.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a href={fileUrl} download className="btn btn-primary">
            <Download className="h-4 w-4" /> Download
          </a>
          <Link href="/contact" className="btn btn-ghost">
            Contact
          </Link>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-14">
          {resume.summary && (
            <Reveal as="section">
              <h2 className="eyebrow">Professional Summary</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
                {resume.summary}
              </p>
            </Reveal>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="eyebrow">Professional Experience</h2>
              <Stagger as="ol" className="mt-6 space-y-10">
                {experience.map((job) => (
                  <StaggerItem
                    as="li"
                    key={job.id ?? job.title}
                    className="border-l border-line pl-6"
                  >
                    <p className="text-sm text-muted">{job.period}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted">
                      {[job.company, job.location].filter(Boolean).join(" · ")}
                    </p>
                    {job.highlights?.length ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
                        {job.highlights.map((highlight) => (
                          <li key={highlight}>
                            <Point text={highlight} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="eyebrow">
                {projects.length > 1 ? "Selected Projects" : "Selected Project"}
              </h2>
              <Stagger className="mt-6 space-y-6">
                {projects.map((project) => (
                  <StaggerItem key={project.id ?? project.title} className="card p-6 sm:p-8">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    {project.subtitle && (
                      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
                    )}
                    {project.stack?.length ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <li key={item} className="chip">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {project.points?.length ? (
                      <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-muted">
                        {project.points.map((point) => (
                          <li key={point}>
                            <Point text={point} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}
        </div>

        <aside className="space-y-10">
          {skillGroups.length > 0 && (
            <section>
              <h2 className="eyebrow">Technical Skills</h2>
              <Stagger className="mt-5 space-y-6">
                {skillGroups.map((group) => (
                  <StaggerItem key={group.id ?? group.title}>
                    <h3 className="text-sm font-medium">{group.title}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {(group.skills ?? []).map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="eyebrow">Education</h2>
              <Stagger as="ul" className="mt-5 space-y-4 text-sm">
                {education.map((item) => (
                  <StaggerItem as="li" key={item.id ?? item.degree}>
                    <p className="font-medium">{item.degree}</p>
                    <p className="mt-1 text-muted">
                      {[item.school, item.period].filter(Boolean).join(" · ")}
                    </p>
                    {item.highlights?.length ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
