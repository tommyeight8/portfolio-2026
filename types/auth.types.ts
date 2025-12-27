// src/types/auth.types.ts

export interface LoginPinDTO {
  email: string;
  pinHash: string;
  expiresAt: Date;
}

export interface VerifyPinDTO {
  email: string;
  pin: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}
