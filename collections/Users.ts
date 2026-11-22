import { APIError, type CollectionConfig } from "payload";
import { readCookie, TURNSTILE_COOKIE, turnstileEnabled, verifyTurnstile } from "../lib/turnstile";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", group: "Admin" },
  hooks: {
    beforeOperation: [
      async ({ args, operation, req }) => {
        // Check Turnstile before Payload looks at the password, so a failed
        // check never reveals whether the credentials were right.
        if (operation === "login" && turnstileEnabled()) {
          const token = readCookie(req.headers?.get("cookie"), TURNSTILE_COOKIE);
          if (!(await verifyTurnstile(token))) {
            throw new APIError(
              "Security check failed. Wait for the check to complete, then try again.",
              403,
              undefined,
              true,
            );
          }
        }
        return args;
      },
    ],
  },
  fields: [{ name: "name", type: "text" }],
};
