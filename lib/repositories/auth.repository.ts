// src/lib/repositories/auth.repository.ts

import prisma from "@/lib/db/prisma";
import { LoginPinDTO } from "@/types/auth.types";

class AuthRepository {
  async createPin(data: LoginPinDTO) {
    // Delete any existing pins for this email first
    await prisma.loginPin.deleteMany({
      where: { email: data.email },
    });

    return prisma.loginPin.create({
      data: {
        email: data.email,
        pinHash: data.pinHash,
        expiresAt: data.expiresAt,
      },
    });
  }

  async findPinByEmail(email: string) {
    return prisma.loginPin.findFirst({
      where: {
        email,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async deletePin(id: string) {
    return prisma.loginPin.delete({ where: { id } });
  }

  async deletePinsByEmail(email: string) {
    return prisma.loginPin.deleteMany({ where: { email } });
  }

  async cleanupExpiredPins() {
    return prisma.loginPin.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
}

export const authRepository = new AuthRepository();
export default authRepository;
