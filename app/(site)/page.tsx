import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { getHome, getProjects, getSettings } from "@/lib/data";

const STATUS_DOT = {
  available: "bg-emerald-500",
  busy: "bg-amber-500",
  unavailable: "bg-rose-500",
} as const;

export default async function HomePage() {
  const [home, settings, featured] = await Promise.all([
    getHome(),
    getSettings(),
    getProjects({ featured: true, limit: 6 }),
  ]);
  // Before anything is marked featured, show the first projects instead of an empty section.
  const projects = featured.length ? featured : await getProjects({ limit: 6 });

  const services = home.services ?? [];
  const skills = home.skills ?? [];
  const skillColumns = [
    { title: "Development", items: skills.filter((s) => s.category === "dev") },
    { title: "Design", items: skills.filter((s) => s.category === "design") },
  ].filter((column) => column.items.length);

  return (
    <>
      {/* Hero */}
      <section className="hero-mesh">
        <div className="container-site py-16 sm:py-24">
          <Reveal className="hero-glass px-6 py-10 sm:px-12 sm:py-14">
            <Stagger>
              {settings.availability && (
                <StaggerItem
                  as="p"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/85"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_DOT[settings.availabilityStatus ?? "available"]}`}
                  />
                  {settings.availability}
                </StaggerItem>
              )}
              <StaggerItem>
                <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
                  {home.hero.headline}
                </h1>
              </StaggerItem>
              {home.hero.subheadline && (
                <StaggerItem
                  as="p"
                  className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
                >
                  {home.hero.subheadline}
                </StaggerItem>
              )}
              <StaggerItem className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="btn bg-white text-blue-700 hover:bg-blue-50"
                >
                  View Projects <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Let&apos;s Talk
                </Link>
              </StaggerItem>
            </Stagger>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      {projects.length > 0 && (
        <section className="container-site py-16">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Recent projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="shrink-0 text-sm text-muted transition-colors hover:text-fg"
            >
              All projects →
            </Link>
          </Reveal>
          <Stagger className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} priority={index < 3} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="container-site py-16">
          <Reveal>
            <p className="eyebrow">What I Do</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Services &amp; expertise
            </h2>
          </Reveal>
          <Stagger className="mt-10 border-t border-line">
            {services.map((service, index) => (
              <StaggerItem
                key={service.id ?? service.title}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-[5rem_1fr_1fr] md:gap-8"
              >
                <span className="font-display text-3xl font-semibold text-muted/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
                <div>
                  {service.description && (
                    <p className="leading-relaxed text-muted">{service.description}</p>
                  )}
                  {service.skills?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {service.skills.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Skills */}
      {skillColumns.length > 0 && (
        <section className="container-site py-16">
          <Reveal>
            <p className="eyebrow">Toolkit</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Skills</h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {skillColumns.map((column) => (
              <div key={column.title}>
                <Reveal as="div">
                  <h3 className="text-sm font-medium text-muted">{column.title}</h3>
                </Reveal>
                <Stagger as="ul" className="mt-4 space-y-4">
                  {column.items.map((skill) => (
                    <StaggerItem as="li" key={skill.id ?? skill.name}>
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="container-site py-20">
        <Reveal className="card px-6 py-16 text-center shadow-[0_8px_40px_-12px_rgb(15_23_42/0.12)] sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold sm:text-5xl">
            {home.cta?.headline}
          </h2>
          {home.cta?.text && (
            <p className="mx-auto mt-5 max-w-xl text-muted">{home.cta.text}</p>
          )}
          <Link href="/contact" className="btn btn-primary mt-8">
            Start a Conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
