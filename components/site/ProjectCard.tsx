import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/payload-types";
import { PROJECT_CATEGORIES } from "@/collections/Projects";
import { asMedia, mediaUrl } from "@/lib/data";

export function categoryLabel(value: Project["category"]) {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const src = mediaUrl(project.thumbnail, "card");
  const alt = asMedia(project.thumbnail)?.alt || project.title;

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="card relative aspect-[4/3] overflow-hidden">
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {categoryLabel(project.category)} · {project.year}
          </p>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
      </div>
    </Link>
  );
}
