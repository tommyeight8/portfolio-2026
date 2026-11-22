"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  company: z.string().trim().max(100).optional(),
  subject: z.string().trim().min(2, "Subject must be at least 2 characters").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  values?: Record<string, string>;
  /** Increases on every failed submit so the Turnstile widget fetches a fresh token. */
  attempt?: number;
};

export async function submitContact(
  previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(
    ["name", "email", "company", "subject", "message"].map((key) => [
      key,
      String(formData.get(key) ?? ""),
    ]),
  );

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (formData.get("website")) return { status: "success" };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, values, attempt: previous.attempt };
  }

  // Checked after validation, because a Turnstile token can only be verified once.
  const attempt = (previous.attempt ?? 0) + 1;
  if (!(await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? "")))) {
    return {
      status: "error",
      message: "Security check failed. Wait for the check to complete, then send again.",
      values,
      attempt,
    };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: { ...parsed.data, company: parsed.data.company || undefined },
    });
    return { status: "success" };
  } catch (error) {
    console.error("Contact form submission failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
      values,
      attempt,
    };
  }
}
