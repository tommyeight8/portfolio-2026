import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { getResume, getSettings, mediaUrl } from "@/lib/data";

export const metadata: Metadata = { title: "Resume" };

// Used until a resume file is uploaded in the admin (Site → Resume).
const FALLBACK_FILE = "/Tommy_Vong_Senior_Full_Stack_Engineer.docx";

export default async function ResumePage() {
  const [resume, settings] = await Promise.all([getResume(), getSettings()]);
  const fileUrl = mediaUrl(resume.file) ?? FALLBACK_FILE;

  const experience = resume.experience ?? [];
  const skillGroups = resume.skillGroups ?? [];
  const education = resume.education ?? [];

  return (
    <div className="container-site py-16 sm:py-20">
      <header className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">
            {settings.ownerName}
          </h1>
          <p className="mt-3 text-muted">
            {[settings.ownerTitle, settings.location].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={fileUrl} download className="btn btn-primary">
            <Download className="h-4 w-4" /> Download
          </a>
          <Link href="/contact" className="btn btn-ghost">
            Contact
          </Link>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-14">
          {resume.summary && (
            <section>
              <h2 className="eyebrow">Summary</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                {resume.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="eyebrow">Experience</h2>
              <ol className="mt-6 space-y-10">
                {experience.map((job) => (
                  <li key={job.id ?? job.title} className="border-l border-line pl-6">
                    <p className="text-sm text-muted">{job.period}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted">
                      {[job.company, job.location].filter(Boolean).join(" · ")}
                    </p>
                    {job.highlights?.length ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
                        {job.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="space-y-10">
          {skillGroups.length > 0 && (
            <section>
              <h2 className="eyebrow">Skills</h2>
              <div className="mt-5 space-y-6">
                {skillGroups.map((group) => (
                  <div key={group.id ?? group.title}>
                    <h3 className="text-sm font-medium">{group.title}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {(group.skills ?? []).map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="eyebrow">Education</h2>
              <ul className="mt-5 space-y-4 text-sm">
                {education.map((item) => (
                  <li key={item.id ?? item.degree}>
                    <p className="font-medium">{item.degree}</p>
                    <p className="mt-1 text-muted">
                      {[item.school, item.period].filter(Boolean).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
