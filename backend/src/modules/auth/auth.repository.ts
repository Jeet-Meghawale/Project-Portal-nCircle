import { prisma } from "../../database/client"
import { RegisterUserInput } from "./auth.types"
import { RegisterInput } from "../../validators/auth.validator"


export const authRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  },

  async createUser(data: RegisterUserInput) {
    return await prisma.user.create({
      data
    })
  },

  async saveRefreshToken(token: string, userId: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt
      },
    });
  },

  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: {
        user: true
      },
    });
  },

  async revokeRefreshToken(userId: string) {
    return prisma.refreshToken.update({
      where: { userId },
      data: {
        revoked: true,
      },

    });
  },

  async revokeAllUserTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId },
      data: {
        revoked: true
      }
    })
  },

  async updateRefreshToken(userId: string, token: string) {
    return prisma.refreshToken.update({
      where: { userId },
      data: {
        token: token
      }
    })
  },
  async findExistingToken(userId: string) {
    return prisma.refreshToken.findUnique({
      where: { userId }
    })
  },
  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId }
    });
  },
}