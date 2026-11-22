import type { Metadata } from "next";
import Link from "next/link";
import { PROJECT_CATEGORIES } from "@/collections/Projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { getProjects } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web development, design and branding work.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = PROJECT_CATEGORIES.find((c) => c.value === category)?.value;
  const projects = await getProjects({ category: active });

  const filters = [
    { label: "All", href: "/projects", selected: !active },
    ...PROJECT_CATEGORIES.map((c) => ({
      label: c.label,
      href: `/projects?category=${c.value}`,
      selected: active === c.value,
    })),
  ];

  return (
    <div className="container-site py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Projects</h1>
      </Reveal>

      <nav aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.href}
            href={filter.href}
            aria-current={filter.selected ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter.selected
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-line text-muted hover:border-blue-600 hover:text-fg",
            )}
          >
            {filter.label}
          </Link>
        ))}
      </nav>

      {projects.length ? (
        <Stagger
          // Re-run the stagger when the category filter changes.
          key={active ?? "all"}
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} priority={index < 3} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <p className="mt-16 text-muted">
          {active ? "No projects in this category yet." : "No projects published yet."}
        </p>
      )}
    </div>
  );
}
