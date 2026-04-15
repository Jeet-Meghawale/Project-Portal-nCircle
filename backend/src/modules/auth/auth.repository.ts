import { prisma } from "../../database/client"
import { RegisterUserInput } from "./auth.types"
import { Prisma, Role } from "@prisma/client"


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
  getAllUsersbyFilter(filter: any) {
    return prisma.user.findMany({
      where: filter
    });
  },
  registerBulk(users: Prisma.UserCreateManyInput[]) {
    return prisma.user.createMany({
      data: users
    });
  },
  async updateUser(userId: string, updateData: Partial<RegisterUserInput>) {
    return prisma.user.update({
      where: { id: userId },
      data: updateData
    });
  },
  async verifyUserRole(email: string, role: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    if (user.role !== role) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  },
  async getCoordinators() {
    return prisma.user.findMany({
      where: { role: Role.COORDINATOR }
    });
  },

}