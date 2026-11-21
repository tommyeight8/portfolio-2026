import type { GlobalConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";

export const Resume: GlobalConfig = {
  slug: "resume",
  admin: { group: "Site" },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      admin: { description: "Downloadable resume (PDF or DOCX)." },
    },
    {
      name: "summary",
      type: "textarea",
      defaultValue: "Full-stack developer with 10+ years of design experience.",
    },
    {
      name: "experience",
      type: "array",
      defaultValue: [
        {
          title: "Full-Stack Developer",
          company: "Cultivated Agency",
          location: "Walnut, CA",
          period: "2020 – Present",
          highlights: [
            "Build custom Shopify storefronts and headless e-commerce solutions using Storefront API, Liquid templating, and React/Next.js",
            "Develop full-stack web applications with Next.js, TypeScript, Prisma, and PostgreSQL",
            "Architect warehouse management systems with barcode scanning integration and real-time inventory tracking",
            "Integrate third-party services including Stripe, ShipEngine, Resend, and Cloudinary",
          ],
        },
        {
          title: "Graphic Designer & Web Developer",
          company: "XLanes LLC",
          location: "Los Angeles, CA",
          period: "2014 – 2020",
          highlights: [
            "Led design and development of brand websites, landing pages, and digital marketing assets",
            "Developed integrated marketing campaigns across web, print, and social media channels",
            "Created comprehensive branding systems including logos, style guides, and marketing collateral",
          ],
        },
        {
          title: "Jr Graphic Designer",
          company: "IMI Studio",
          location: "El Monte, CA",
          period: "2012 – 2014",
          highlights: [
            "Created visual assets for print and digital marketing materials",
            "Prepared production-ready files and coordinated with print vendors",
          ],
        },
      ],
      fields: [
        {
          type: "row",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "company", type: "text", required: true },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "location", type: "text" },
            { name: "period", type: "text" },
          ],
        },
        { name: "highlights", type: "text", hasMany: true },
      ],
    },
    {
      name: "skillGroups",
      type: "array",
      defaultValue: [
        {
          title: "Languages & Frameworks",
          skills: [
            "TypeScript",
            "JavaScript",
            "React",
            "Next.js",
            "Node.js",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
          ],
        },
        {
          title: "E-Commerce & Shopify",
          skills: [
            "Storefront API",
            "Liquid",
            "Custom Themes",
            "Headless Commerce",
            "Stripe",
          ],
        },
        {
          title: "Databases & APIs",
          skills: [
            "PostgreSQL",
            "MongoDB",
            "Prisma",
            "REST APIs",
            "ShipEngine",
            "Socket.io",
          ],
        },
        {
          title: "Design Tools",
          skills: ["Figma", "Photoshop", "Illustrator", "InDesign", "Framer Motion"],
        },
      ],
      fields: [
        { name: "title", type: "text", required: true },
        { name: "skills", type: "text", hasMany: true },
      ],
    },
    {
      name: "education",
      type: "array",
      defaultValue: [
        {
          degree: "Bachelor of Fine Arts in Graphic Design",
          school: "California State Polytechnic University, Pomona",
        },
      ],
      fields: [
        { name: "degree", type: "text", required: true },
        { name: "school", type: "text", required: true },
        { name: "period", type: "text" },
      ],
    },
  ],
};
