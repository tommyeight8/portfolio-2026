import type { GlobalConfig } from "payload";
import { revalidateSite } from "../lib/revalidate";

// Social links open in a new tab, so they must be complete web addresses.
const validateUrl = (value: unknown) =>
  !value || /^https?:\/\/\S+$/i.test(String(value).trim())
    ? true
    : "Enter the full URL, starting with https://";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Site" },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Site",
          fields: [
            {
              name: "siteName",
              type: "text",
              required: true,
              defaultValue: "TommyVong.",
            },
            {
              name: "siteDescription",
              type: "textarea",
              defaultValue: "Creative developer crafting digital experiences.",
            },
          ],
        },
        {
          label: "Owner",
          fields: [
            { name: "ownerName", type: "text", defaultValue: "Tommy Vong" },
            {
              name: "ownerTitle",
              type: "text",
              defaultValue: "Web Developer & Graphic Designer",
            },
            { name: "profileImage", type: "upload", relationTo: "media" },
            {
              name: "bio",
              type: "textarea",
              admin: { description: "One paragraph per line break." },
              defaultValue:
                "I'm a developer and designer with a passion for creating digital experiences that are both beautiful and functional. With years of experience spanning e-commerce, mobile apps, and brand design, I bring a unique perspective to every project.\n\nMy journey started in graphic design, which gave me a strong foundation in visual communication. This evolved into web development, where I discovered the power of bringing designs to life through code.\n\nToday, I specialize in Shopify development, Next.js applications, and creating cohesive brand identities that help businesses stand out in the digital landscape.",
            },
            { name: "location", type: "text", defaultValue: "Los Angeles, CA" },
            {
              type: "row",
              fields: [
                {
                  name: "availability",
                  type: "text",
                  defaultValue: "Available for projects",
                },
                {
                  name: "availabilityStatus",
                  type: "select",
                  defaultValue: "available",
                  options: [
                    { label: "Available", value: "available" },
                    { label: "Busy", value: "busy" },
                    { label: "Unavailable", value: "unavailable" },
                  ],
                },
              ],
            },
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              defaultValue: [
                { value: "8+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
                { value: "∞", label: "Happy Clients" },
              ],
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true },
                    { name: "label", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Contact & Social",
          fields: [
            {
              name: "contactEmail",
              type: "email",
              admin: {
                description:
                  "Shown on the site and used for contact form notifications.",
              },
            },
            {
              name: "social",
              type: "group",
              label: "Social links",
              admin: {
                description:
                  "Paste the full profile URL. Each one you fill in shows as an icon in the site footer; leave a field empty to hide it.",
              },
              fields: [
                {
                  name: "github",
                  type: "text",
                  label: "GitHub",
                  admin: { placeholder: "https://github.com/username" },
                  validate: validateUrl,
                },
                {
                  name: "linkedin",
                  type: "text",
                  label: "LinkedIn",
                  admin: { placeholder: "https://www.linkedin.com/in/username" },
                  validate: validateUrl,
                },
                {
                  name: "twitter",
                  type: "text",
                  label: "X (Twitter)",
                  admin: { placeholder: "https://x.com/username" },
                  validate: validateUrl,
                },
                {
                  name: "instagram",
                  type: "text",
                  label: "Instagram",
                  admin: { placeholder: "https://www.instagram.com/username" },
                  validate: validateUrl,
                },
                {
                  name: "dribbble",
                  type: "text",
                  label: "Dribbble",
                  admin: { placeholder: "https://dribbble.com/username" },
                  validate: validateUrl,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
