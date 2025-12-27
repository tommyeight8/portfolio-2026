// src/lib/services/auth.service.ts

import bcrypt from "bcryptjs";
import authRepository from "@/lib/repositories/auth.repository";
import emailService from "@/lib/services/email.service";
import {
  requestPinSchema,
  verifyPinSchema,
  RequestPinInput,
  VerifyPinInput,
} from "@/lib/validations/auth.validations";
import { AuthResponse } from "@/types/auth.types";

class AuthService {
  private getAllowedEmails(): string[] {
    const emails = process.env.ALLOWED_ADMIN_EMAILS || "";
    return emails
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }

  isEmailAllowed(email: string): boolean {
    const allowedEmails = this.getAllowedEmails();
    return allowedEmails.includes(email.toLowerCase());
  }

  generatePin(): string {
    // Generate a secure 6-digit PIN
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async requestPin(data: RequestPinInput): Promise<AuthResponse> {
    try {
      const validated = requestPinSchema.parse(data);
      const email = validated.email.toLowerCase();

      // Check if email is allowed
      if (!this.isEmailAllowed(email)) {
        // Return generic message to prevent email enumeration
        return {
          success: true,
          message:
            "If this email is registered, you will receive a PIN shortly.",
        };
      }

      // Generate PIN and hash it
      const pin = this.generatePin();
      const pinHash = await bcrypt.hash(pin, 10);

      // PIN expires in 10 minutes
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      // Save PIN to database
      await authRepository.createPin({
        email,
        pinHash,
        expiresAt,
      });

      // Send PIN via email
      const emailSent = await emailService.sendLoginPin(email, pin);

      if (!emailSent) {
        return {
          success: false,
          error: "Failed to send PIN. Please try again.",
        };
      }

      return {
        success: true,
        message: "If this email is registered, you will receive a PIN shortly.",
      };
    } catch (error) {
      console.error("Request PIN error:", error);
      return {
        success: false,
        error: "An error occurred. Please try again.",
      };
    }
  }

  async verifyPin(
    data: VerifyPinInput
  ): Promise<AuthResponse & { verified?: boolean }> {
    try {
      const validated = verifyPinSchema.parse(data);
      const email = validated.email.toLowerCase();

      // Check if email is allowed
      if (!this.isEmailAllowed(email)) {
        return {
          success: false,
          error: "Invalid email or PIN.",
          verified: false,
        };
      }

      // Find the PIN record
      const pinRecord = await authRepository.findPinByEmail(email);

      if (!pinRecord) {
        return {
          success: false,
          error: "Invalid email or PIN.",
          verified: false,
        };
      }

      // Verify the PIN
      const isValid = await bcrypt.compare(validated.pin, pinRecord.pinHash);

      if (!isValid) {
        return {
          success: false,
          error: "Invalid email or PIN.",
          verified: false,
        };
      }

      // Delete the used PIN
      await authRepository.deletePin(pinRecord.id);

      return {
        success: true,
        message: "PIN verified successfully.",
        verified: true,
      };
    } catch (error) {
      console.error("Verify PIN error:", error);
      return {
        success: false,
        error: "An error occurred. Please try again.",
        verified: false,
      };
    }
  }
}

export const authService = new AuthService();
export default authService;
