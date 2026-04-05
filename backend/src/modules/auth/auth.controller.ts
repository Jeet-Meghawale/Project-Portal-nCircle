import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/send.response";

export const authController = {
    async registerController(req: Request, res: Response) {
        const user = await authService.registerUser(req.body);
        if (user === 409) {
            sendResponse(res, 409, null, "User already exists");
            return;
        }
        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        })
    },
    async loginController(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await authService.login(email, password);
        if (result.status === 401) {
            sendResponse(res, 401, null, "Invalid credentials");
            return;
        }
        if (result.status === 404) {
            sendResponse(res, 404, null, "User not found");
            return;
        }

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            user: result.safeUser
        });
    },
    async refreshController(req: Request, res: Response) {
        const refreshToken = req.cookies?.refreshToken;

        const result = await authService.refresh(refreshToken);
        if (result.status === 401) {
            sendResponse(res, 401, null, "Invalid refresh token");
            return;
        }
        if (result.status === 404) {
            sendResponse(res, 404, null, "User not found");
            return;
        }
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            accessToken: result.accessToken
        });
    },
    async meController(req: Request, res: Response) {

        const userId = (req as any).userId;

        const user = await authService.getMe(userId);

        if (user.status === 404) {
            sendResponse(res, 404, null, "User not found");
            return;
        }
        res.status(200).json({
            success: true,
            data: user.data
        });
    },
    async logoutController(req: Request, res: Response) {

        const refreshToken = req.cookies?.refreshToken;

        const result = await authService.logout(refreshToken);

        if (result.status === 401) {
            return sendResponse(res, 401, null, "Invalid or missing token");
        }

        if (result.status === 404) {
            return sendResponse(res, 404, null, "Session not found");
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    },
    async getAllUsers(req: Request, res: Response) {
        const users = await authService.getAllUsers();

        sendResponse(res, 200, users, "Users fetched successfully");
    },
    async getUsersByFilter(req: Request, res: Response) {
        const filter = req.query;
        const users = await authService.getUsersByFilter(filter);

        sendResponse(res, 200, users, "Users fetched successfully");
    },
    async registerBulk(req: Request, res: Response) {
        const users = req.body;
        await authService.registerBulk(users);
        sendResponse(res, 201, null, "Users registered successfully");
    },
    async updateUserController(req: Request, res: Response) {
        const userId = req.params.id as string;
        const updateData = req.body;

        const updatedUser = await authService.updateUser(userId, updateData);
        sendResponse(res, 200, updatedUser, "User updated successfully");
    },
    async verifyRoleController(req: Request, res: Response) {
        const { email, role } = req.body;
        const hasRole = await authService.verifyRole(email, role);
        if (hasRole === "User not found") {
            return sendResponse(res, 404, null, "User not found");
        }
        sendResponse(res, 200, { hasRole }, "Role verified successfully");
    },
}