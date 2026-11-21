import type { GlobalConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  admin: { group: "Site" },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "headline",
          type: "text",
          required: true,
          defaultValue: "Designing & Building Modern Websites",
        },
        {
          name: "subheadline",
          type: "textarea",
          defaultValue:
            "Pixel-perfect design meets production-ready code. Shopify expert, full-stack developer, and visual creator.",
        },
      ],
    },
    {
      name: "services",
      type: "array",
      labels: { singular: "Service", plural: "Services" },
      defaultValue: [
        {
          title: "Shopify Development",
          description:
            "Custom storefronts, theme development, and backend solutions. From Liquid templates to Shopify APIs, I build scalable e-commerce experiences that convert.",
          skills: ["Liquid", "Storefront API", "Admin API", "Theme Dev", "Apps"],
        },
        {
          title: "Web & Mobile Apps",
          description:
            "Full-stack applications with Next.js and React Native. Server components, API routes, and native mobile experiences with shared business logic.",
          skills: ["Next.js", "React Native", "TypeScript", "Node.js", "Prisma"],
        },
        {
          title: "Graphic Design",
          description:
            "Brand identities, UI/UX design, and visual storytelling. Creating cohesive design systems that elevate your brand across all touchpoints.",
          skills: ["Figma", "Photoshop", "Illustrator", "Brand Design", "UI/UX"],
        },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "skills", type: "text", hasMany: true },
      ],
    },
    {
      name: "skills",
      type: "array",
      labels: { singular: "Skill", plural: "Skills" },
      admin: { description: "Skill bars on the home page." },
      defaultValue: [
        { name: "JavaScript", level: 95, category: "dev" },
        { name: "TypeScript", level: 85, category: "dev" },
        { name: "Next.js", level: 90, category: "dev" },
        { name: "React Native", level: 85, category: "dev" },
        { name: "Expo", level: 80, category: "dev" },
        { name: "Tailwind", level: 90, category: "dev" },
        { name: "HTML", level: 98, category: "dev" },
        { name: "CSS", level: 92, category: "dev" },
        { name: "MongoDB", level: 85, category: "dev" },
        { name: "PostgreSQL", level: 85, category: "dev" },
        { name: "Neon", level: 85, category: "dev" },
        { name: "Adobe Suite", level: 90, category: "design" },
        { name: "Illustrator", level: 87, category: "design" },
        { name: "Photoshop", level: 89, category: "design" },
        { name: "InDesign", level: 80, category: "design" },
      ],
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "level", type: "number", min: 0, max: 100, required: true },
            {
              name: "category",
              type: "select",
              required: true,
              defaultValue: "dev",
              options: [
                { label: "Development", value: "dev" },
                { label: "Design", value: "design" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      label: "Contact call-to-action",
      fields: [
        {
          name: "headline",
          type: "text",
          defaultValue: "Let's create something amazing together",
        },
        {
          name: "text",
          type: "textarea",
          defaultValue:
            "Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.",
        },
      ],
    },
  ],
};
