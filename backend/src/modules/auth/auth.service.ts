import { authRepository } from "./auth.repository"
import { RegisterUserInput } from "./auth.types"
import { registerSchema, RegisterInput } from "../../validators/auth.validator"
import { comparePassword, hashPassword } from "../../utils/password.util"
import { Role } from "@prisma/client"
import { ApiError } from "../../utils/api.error"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.util"
import { verify } from "node:crypto"


export const authService = {
  async registerUser(data: RegisterUserInput) {
    // Validata req Body
    const validatedData = registerSchema.parse(data);

    // check Existing User
    const existingUser = await authRepository.findUserByEmail(validatedData.email)

    if (existingUser) {
      throw new ApiError(409,"User already exists")
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
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    )
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
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
      throw new ApiError(401, "Refresh token missing");
    }

    let decoded: any;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new ApiError(401, "Invalid refresh token");
    }
    const userId = decoded.userId;

    const storedToken = await authRepository.findExistingToken(userId);
    if (!storedToken) {
      throw new ApiError(401, "Refresh Token mismatch");
    }

    if (storedToken.revoked) {
      throw new ApiError(401, "Refresh token revoked");
    }
    if (storedToken.expiresAt < new Date()) {
      throw new ApiError(401, "Refresh token expired")
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
      throw new ApiError(404, "User not found");
    }

    const { password: _, ...safeUser } = user;

    return safeUser;
  },
  async logout(refreshToken: string) {

    if (!refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    let decoded: any;

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, "Invalid refresh token");
    }

    const userId = decoded.userId;

    const storedToken = await authRepository.findExistingToken(userId);

    if (!storedToken) {
      throw new ApiError(404, "Refresh token not found");
    }

    await authRepository.revokeRefreshToken(userId);
  }
}