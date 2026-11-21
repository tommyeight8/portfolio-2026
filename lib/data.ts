import { cache } from "react";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import type { Media, Project } from "@/payload-types";

const client = cache(() => getPayload({ config }));

export const getSettings = cache(async () =>
  (await client()).findGlobal({ slug: "site-settings", depth: 1 }),
);

export const getHome = cache(async () =>
  (await client()).findGlobal({ slug: "home" }),
);

export const getResume = cache(async () =>
  (await client()).findGlobal({ slug: "resume", depth: 1 }),
);

type ProjectQuery = {
  category?: Project["category"];
  featured?: boolean;
  limit?: number;
};

export async function getProjects({
  category,
  featured,
  limit = 100,
}: ProjectQuery = {}) {
  const and: Where[] = [{ _status: { equals: "published" } }];
  if (category) and.push({ category: { equals: category } });
  if (featured) and.push({ featured: { equals: true } });

  const { docs } = await (await client()).find({
    collection: "projects",
    where: { and },
    sort: ["order", "-year"],
    limit,
    depth: 1,
  });
  return docs;
}

export const getProjectBySlug = cache(async (slug: string) => {
  const { docs } = await (await client()).find({
    collection: "projects",
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
});

/** Upload fields come back as an id when not populated; only a populated doc has a URL. */
export function asMedia(
  value: number | Media | null | undefined,
): Media | null {
  return value && typeof value === "object" ? value : null;
}

export function mediaUrl(
  value: number | Media | null | undefined,
  size?: "thumbnail" | "card" | "large",
): string | null {
  const media = asMedia(value);
  if (!media) return null;
  return (size && media.sizes?.[size]?.url) || media.url || null;
}
