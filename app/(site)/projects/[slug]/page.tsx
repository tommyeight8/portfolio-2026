import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { categoryLabel } from "@/components/site/ProjectCard";
import { asMedia, getProjectBySlug, mediaUrl } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const image = mediaUrl(project.thumbnail, "large");
  return {
    title: project.title,
    description: project.description,
    openGraph: image ? { images: [image] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const cover = asMedia(project.thumbnail);
  const gallery = (project.images ?? []).map(asMedia).filter((m) => m !== null);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Year", value: String(project.year) },
  ].filter((fact) => fact.value);

  const lists = [
    { label: "Tech stack", items: project.techStack },
    { label: "Tools", items: project.tools },
    { label: "Tags", items: project.tags },
  ].filter((list) => list.items?.length);

  return (
    <article className="container-site py-12 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">{categoryLabel(project.category)}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{project.description}</p>
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Source code
              </a>
            )}
          </div>
        )}
      </header>

      {cover?.url && (
        <div className="card relative mt-12 aspect-[16/10] overflow-hidden">
          <Image
            src={mediaUrl(cover, "large") ?? cover.url}
            alt={cover.alt || project.title}
            fill
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          {project.content ? (
            <RichText data={project.content} className="prose-site max-w-none" />
          ) : null}
        </div>

        <aside className="space-y-8 text-sm">
          {facts.length > 0 && (
            <dl className="space-y-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {lists.map((list) => (
            <div key={list.label}>
              <h2 className="text-muted">{list.label}</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {list.items!.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>

      {gallery.length > 0 && (
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {gallery.map((image) =>
            image.url ? (
              <div key={image.id} className="card overflow-hidden">
                <Image
                  src={mediaUrl(image, "large") ?? image.url}
                  alt={image.alt || project.title}
                  width={image.width ?? 1600}
                  height={image.height ?? 1000}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : null,
          )}
        </div>
      )}
    </article>
  );
}
