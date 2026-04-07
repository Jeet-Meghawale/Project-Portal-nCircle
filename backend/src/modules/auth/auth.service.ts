import { authRepository } from "./auth.repository"
import { RegisterUserInput } from "./auth.types"
import { registerSchema, RegisterInput } from "../../validators/auth.validator"
import { comparePassword, hashPassword } from "../../utils/password.util"
import { Role } from "@prisma/client"
import { ApiError } from "../../utils/api.error"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.util"
import { verify } from "node:crypto"
import { get } from "node:http"
import { register } from "node:module"


export const authService = {
  async registerUser(data: RegisterUserInput) {
    // Validata req Body
    const validatedData = registerSchema.parse(data);

    // check Existing User
    const existingUser = await authRepository.findUserByEmail(validatedData.email)

    if (existingUser) {
      return 409; // Conflict
    }

    // Hash Password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create User
    const newUserData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role ?? Role.STUDENT,

      ...(validatedData.mobile && { mobile: validatedData.mobile }),
      ...(validatedData.college && { college: validatedData.college }),
      ...(validatedData.branch && { branch: validatedData.branch }),
      ...(validatedData.graduationYear && { graduationYear: validatedData.graduationYear })
    }
    const user = await authRepository.createUser(newUserData)

    // Remove password from res
    const { password, ...safeUser } = user
    return safeUser
  },

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      return { status: 404 };
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    )
    if (!isPasswordValid) {
      return { status: 401 };
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const exist = await authRepository.findExistingToken(user.id);
    if (exist != null)
      await authRepository.updateRefreshToken(user.id, refreshToken);
    else
      await authRepository.saveRefreshToken(
        refreshToken,
        user.id,
        expiresAt
      );
    const { password: _, ...safeUser } = user;

    return {
      safeUser,
      accessToken,
      refreshToken
    };
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      return { status: 401 };
    }

    let decoded: any;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      return { status: 401 };
    }
    const userId = decoded.userId;

    const storedToken = await authRepository.findExistingToken(userId);
    if (!storedToken) {
      return { status: 401 };
    }
    if (storedToken.token !== refreshToken) {
      return { status: 401 };
    }

    if (storedToken.revoked) {
      return { status: 401 };
    }
    if (storedToken.expiresAt < new Date()) {
      return { status: 401 };
    }
    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    await authRepository.updateRefreshToken(userId, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  },
  async getMe(userId: string) {

    const user = await authRepository.findUserById(userId);

    if (!user) {
      return { status: 404 };
    }

    const { password: _, ...safeUser } = user;

    return {
      status: 200,
      data: safeUser
    };
  },
  async logout(refreshToken: string) {

    if (!refreshToken) {
      return { status: 401 };
    }

    let decoded: any;

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      return { status: 401 };
    }

    const userId = decoded.userId;

    const storedToken = await authRepository.findExistingToken(userId);

    if (!storedToken) {
      return { status: 404 };
    }

    await authRepository.revokeRefreshToken(userId);
    return { status: 200 };
  },

  getAllUsers() {
    return authRepository.getAllUsersbyFilter({});
  },
  getUsersByFilter(filter: any) {
    return authRepository.getAllUsersbyFilter(filter);
  },
  async registerBulk(users: RegisterInput[]) {
    const validUsers = users.map(user => registerSchema.parse(user));
    const usersData = await Promise.all(validUsers.map(async user => {
      const hashedPassword = await hashPassword(user.password);
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword as string,
        role: user.role ?? Role.STUDENT,
      };
    }));
    return authRepository.registerBulk(usersData);
  },
  async updateUser(userId: string, updateData: Partial<RegisterUserInput>) {
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password) as string;
    } else {
      delete updateData.password;
    }
    return authRepository.updateUser(userId, updateData);
  },
  async verifyRole(email: string, role: Role) {
    return authRepository.verifyUserRole(email, role);
  },
  async getCoordinators() {
    return authRepository.getCoordinators();
  }
}