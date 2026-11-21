import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: { read: () => true },
  upload: {
    mimeTypes: [
      "image/*",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 960 },
      { name: "large", width: 1920 },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [{ name: "alt", type: "text" }],
};
