# my-portfolio

Portfolio site and admin in one Next.js app.

- **Admin / CMS:** Payload 3 at `/admin`
- **Database:** Supabase Postgres (`@payloadcms/db-postgres`)
- **Media:** Google Cloud Storage (`@payloadcms/storage-gcs`)
- **Email:** Resend (`@payloadcms/email-resend`)
- **Hosting:** Vercel

## Layout

| Path | What |
|---|---|
| `payload.config.ts` | Payload config: database, storage, email |
| `collections/` | Projects, Media, Messages (contact submissions), Users |
| `globals/` | Site Settings, Home Page, Resume |
| `app/(payload)/` | Payload admin and REST API |
| `app/(site)/` | Public pages, rendered from Payload's Local API |
| `lib/data.ts` | Data fetchers used by the public pages |
| `migrations/` | Database migrations (run in production) |
| `scripts/migrate-legacy.ts` | One-time import from the old Prisma DB + Cloudinary |

## Setup

1. Copy `.env.example` to `.env` and fill it in.
2. `npm install`
3. `npm run dev`, then open `/admin` and create the first admin user.

Without `GCS_BUCKET` uploads go to `./media`; without `RESEND_API_KEY` emails
are logged to the console.

Local development and production share one database, so automatic schema sync
is turned off (`push: false`). The schema only changes through migration files.

## Changing the content model

After editing a collection or global:

```bash
npm run generate:types
npm run payload -- migrate:create <name>
npm run payload -- migrate
```

Commit the new files in `migrations/`. The deploy runs `payload migrate` too,
which is a no-op once the migration has been applied.

## Deploying to Vercel

`vercel.json` sets the build command to `npm run ci` (runs `payload migrate`,
then `next build`). Add the variables from `.env.example` to the Vercel project,
except `LEGACY_DATABASE_URL`.

Vercel limits request bodies to 4.5 MB, so files larger than that cannot be
uploaded through the admin there.

## Migrating the old site's content

Set `LEGACY_DATABASE_URL` to the old database, then:

```bash
npm run migrate:legacy
```

It copies projects, site settings and contact messages, and re-uploads every
Cloudinary image through Payload (into GCS when configured). The old database
is only read. It is safe to re-run.
