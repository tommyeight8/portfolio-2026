/**
 * One-time migration from the old Prisma database + Cloudinary into Payload.
 *
 *   npm run migrate:legacy
 *
 * Needs LEGACY_DATABASE_URL (old database, only read) plus the normal Payload
 * env (DATABASE_URI, and GCS_* so images land in the bucket). Safe to re-run:
 * projects are matched by slug, messages by email + timestamp, and images by
 * source URL within a run.
 */
import path from "path";
import pg from "pg";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Project } from "../payload-types";

const CATEGORY_MAP: Record<string, Project["category"]> = {
  WEB_DEVELOPMENT: "web-development",
  GRAPHIC_DESIGN: "graphic-design",
  BRANDING: "branding",
  UI_UX: "ui-ux",
  FULL_STACK: "full-stack",
};

/** The old `content` column was plain text; turn each paragraph into a Lexical paragraph. */
function textToLexical(text: string) {
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((paragraph) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        children: [
          {
            type: "text",
            text: paragraph,
            format: 0,
            detail: 0,
            mode: "normal",
            style: "",
            version: 1,
          },
        ],
      })),
    },
  };
}

const legacyUrl = process.env.LEGACY_DATABASE_URL;
if (!legacyUrl) {
  console.error("LEGACY_DATABASE_URL is not set. Nothing was migrated.");
  process.exit(1);
}

const payload = await getPayload({ config });
const legacy = new pg.Client({ connectionString: legacyUrl });
await legacy.connect();

const failures: string[] = [];
const uploaded = new Map<string, number>();

async function importFile(url: string, alt: string): Promise<number | null> {
  const cached = uploaded.get(url);
  if (cached) return cached;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    const name = decodeURIComponent(path.basename(new URL(url).pathname)) || "file";
    const media = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        name,
        size: data.length,
        mimetype: response.headers.get("content-type")?.split(";")[0] ?? "application/octet-stream",
      },
    });
    uploaded.set(url, media.id);
    return media.id;
  } catch (error) {
    failures.push(`File ${url}: ${(error as Error).message}`);
    return null;
  }
}

// ---------- Projects ----------
const { rows: projects } = await legacy.query(
  'SELECT * FROM "projects" ORDER BY "order" ASC, "createdAt" ASC',
);
let createdProjects = 0;
let skippedProjects = 0;

for (const row of projects) {
  const existing = await payload.find({
    collection: "projects",
    where: { slug: { equals: row.slug } },
    limit: 1,
    draft: true,
  });
  if (existing.docs.length) {
    skippedProjects++;
    continue;
  }

  const thumbnail = await importFile(row.thumbnail, row.title);
  if (!thumbnail) {
    failures.push(`Project "${row.title}" skipped: its thumbnail could not be copied.`);
    continue;
  }
  const images: number[] = [];
  for (const url of (row.images as string[]) ?? []) {
    const id = await importFile(url, row.title);
    if (id) images.push(id);
  }

  try {
    await payload.create({
      collection: "projects",
      draft: row.status !== "PUBLISHED",
      data: {
        title: row.title,
        slug: row.slug,
        description: row.description,
        content: row.content ? textToLexical(row.content) : undefined,
        category: CATEGORY_MAP[row.category] ?? "web-development",
        tags: row.tags ?? [],
        techStack: row.techStack ?? [],
        tools: row.tools ?? [],
        thumbnail,
        images,
        liveUrl: row.liveUrl,
        githubUrl: row.githubUrl,
        client: row.client,
        role: row.role,
        duration: row.duration,
        year: row.year,
        featured: row.featured,
        order: row.order,
        // ARCHIVED has no equivalent; archived projects become drafts.
        _status: row.status === "PUBLISHED" ? "published" : "draft",
      },
    });
    createdProjects++;
  } catch (error) {
    failures.push(`Project "${row.title}": ${(error as Error).message}`);
  }
}

// ---------- Site settings ----------
let settingsMigrated = false;
const { rows: settingsRows } = await legacy.query('SELECT * FROM "SiteSettings" LIMIT 1');
const old = settingsRows[0];
if (old) {
  const profileImage = old.profileImageUrl
    ? await importFile(old.profileImageUrl, old.ownerName)
    : null;
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: old.siteName,
      siteDescription: old.siteDescription,
      ownerName: old.ownerName,
      ownerTitle: old.ownerTitle,
      ...(old.ownerBio ? { bio: old.ownerBio } : {}),
      location: old.location,
      availability: old.availability,
      availabilityStatus: ["available", "busy", "unavailable"].includes(old.availabilityStatus)
        ? old.availabilityStatus
        : "available",
      contactEmail: old.contactEmail || old.ownerEmail,
      ...(profileImage ? { profileImage } : {}),
      social: {
        github: old.socialGithub,
        linkedin: old.socialLinkedin,
        twitter: old.socialTwitter,
        instagram: old.socialInstagram,
        dribbble: old.socialDribbble,
      },
    },
  });
  settingsMigrated = true;

  if (old.resumeUrl && /^https?:\/\//.test(old.resumeUrl)) {
    const file = await importFile(old.resumeUrl, "Resume");
    if (file) await payload.updateGlobal({ slug: "resume", data: { file } });
  }
}

// ---------- Contact messages ----------
const { rows: messages } = await legacy.query(
  'SELECT * FROM "contact_submissions" ORDER BY "createdAt" ASC',
);
let createdMessages = 0;
let skippedMessages = 0;

for (const row of messages) {
  const createdAt = new Date(row.createdAt).toISOString();
  const existing = await payload.find({
    collection: "contact-submissions",
    where: {
      and: [{ email: { equals: row.email } }, { createdAt: { equals: createdAt } }],
    },
    limit: 1,
  });
  if (existing.docs.length) {
    skippedMessages++;
    continue;
  }
  try {
    await payload.create({
      collection: "contact-submissions",
      // Old messages must not trigger new notification emails.
      context: { skipNotification: true },
      data: {
        name: row.name,
        email: row.email,
        company: row.company,
        subject: row.subject,
        message: row.message,
        read: row.read,
        createdAt,
      },
    });
    createdMessages++;
  } catch (error) {
    failures.push(`Message from ${row.email}: ${(error as Error).message}`);
  }
}

await legacy.end();

console.log(`
Migration finished
  Projects: ${createdProjects} created, ${skippedProjects} already present, ${projects.length} in old database
  Files:    ${uploaded.size} copied
  Settings: ${settingsMigrated ? "migrated" : "no row found in old database"}
  Messages: ${createdMessages} created, ${skippedMessages} already present, ${messages.length} in old database
  Failures: ${failures.length}`);
for (const failure of failures) console.log(`  - ${failure}`);

process.exit(failures.length ? 1 : 0);
