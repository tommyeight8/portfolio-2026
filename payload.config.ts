import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { gcsStorage } from "@payloadcms/storage-gcs";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { SiteSettings } from "./globals/SiteSettings";
import { Home } from "./globals/Home";
import { Resume } from "./globals/Resume";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const gcsBucket = process.env.GCS_BUCKET;
const gcsCredentials = process.env.GCS_CREDENTIALS
  ? JSON.parse(process.env.GCS_CREDENTIALS)
  : undefined;

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · TommyVong. Admin",
      icons: [{ rel: "icon", type: "image/png", url: "/images/portfolio-logo.png" }],
    },
    components: {
      graphics: {
        Logo: "/components/admin/Logo#Logo",
        Icon: "/components/admin/Icon#Icon",
      },
    },
  },
  collections: [Projects, Media, ContactSubmissions, Users],
  globals: [SiteSettings, Home, Resume],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    migrationDir: path.resolve(dirname, "migrations"),
    // Local dev and production share one database, so the schema only ever
    // changes through migration files (never dev-mode auto-sync).
    push: false,
  }),
  // Without RESEND_API_KEY Payload logs emails to the console instead of sending.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM || "onboarding@resend.dev",
        defaultFromName: process.env.EMAIL_FROM_NAME || "Portfolio",
      })
    : undefined,
  plugins: [
    // Without GCS_BUCKET uploads are written to ./media on local disk.
    gcsStorage({
      enabled: Boolean(gcsBucket),
      collections: { media: true },
      bucket: gcsBucket || "unset",
      options: {
        projectId: process.env.GCS_PROJECT_ID,
        credentials: gcsCredentials,
      },
    }),
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
