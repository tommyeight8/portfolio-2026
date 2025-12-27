// src/lib/validations/auth.validation.ts

import { z } from "zod";

export const requestPinSchema = z.object({
  email: z.email("Invalid email address"),
});

export const verifyPinSchema = z.object({
  email: z.email("Invalid email address"),
  pin: z
    .string()
    .length(6, "PIN must be 6 digits")
    .regex(/^\d+$/, "PIN must be numeric"),
});

export type RequestPinInput = z.infer<typeof requestPinSchema>;
export type VerifyPinInput = z.infer<typeof verifyPinSchema>;
