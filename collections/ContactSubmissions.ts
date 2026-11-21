import type { CollectionConfig } from "payload";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Message", plural: "Messages" },
  admin: {
    group: "Inbox",
    useAsTitle: "subject",
    defaultColumns: ["subject", "name", "email", "read", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: {
    // The public form writes through a server action (Local API), so the
    // REST/GraphQL endpoints stay closed to anonymous visitors.
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req, context }) => {
        // The legacy migration imports old messages without re-notifying.
        if (operation !== "create" || context.skipNotification) return doc;
        try {
          const settings = await req.payload.findGlobal({
            slug: "site-settings",
            req,
          });
          const to = settings.contactEmail || process.env.ADMIN_EMAIL;
          if (!to) return doc;
          await req.payload.sendEmail({
            to,
            replyTo: doc.email,
            subject: `New message: ${doc.subject}`,
            html: `
              <p><strong>${escapeHtml(doc.name)}</strong> &lt;${escapeHtml(doc.email)}&gt;${
                doc.company ? ` · ${escapeHtml(doc.company)}` : ""
              }</p>
              <p style="white-space:pre-wrap">${escapeHtml(doc.message)}</p>
            `,
          });
        } catch (error) {
          // The message is already saved; a failed notification must not fail the form.
          req.payload.logger.error({ err: error }, "Contact notification failed");
        }
        return doc;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text" },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    {
      name: "read",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
