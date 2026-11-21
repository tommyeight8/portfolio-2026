import type { CollectionConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";
import { slugify } from "../lib/utils";

export const PROJECT_CATEGORIES = [
  { label: "Web Development", value: "web-development" },
  { label: "Full Stack", value: "full-stack" },
  { label: "UI/UX", value: "ui-ux" },
  { label: "Graphic Design", value: "graphic-design" },
  { label: "Branding", value: "branding" },
] as const;

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "order", "_status"],
  },
  defaultSort: "order",
  versions: { drafts: true },
  access: {
    // Visitors only see published projects; a logged-in admin sees drafts too.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Leave empty to generate from the title.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => slugify(value || data?.title || ""),
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: { description: "Short summary shown on cards." },
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    { name: "images", type: "upload", relationTo: "media", hasMany: true },
    { name: "content", type: "richText" },
    {
      type: "row",
      fields: [
        { name: "liveUrl", type: "text" },
        { name: "githubUrl", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "client", type: "text" },
        { name: "role", type: "text" },
        { name: "duration", type: "text" },
      ],
    },
    { name: "tags", type: "text", hasMany: true },
    { name: "techStack", type: "text", hasMany: true },
    { name: "tools", type: "text", hasMany: true },
    {
      name: "category",
      type: "select",
      required: true,
      index: true,
      options: [...PROJECT_CATEGORIES],
      admin: { position: "sidebar" },
    },
    {
      name: "year",
      type: "number",
      required: true,
      defaultValue: () => new Date().getFullYear(),
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers show first." },
    },
  ],
};
