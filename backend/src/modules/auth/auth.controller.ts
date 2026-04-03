import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/send.response";

export const authController = {
    async registerController(req: Request, res: Response) {
        const user = await authService.registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        })
    },
    async loginController(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

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

        res.status(200).json({
            success: true,
            data: user
        });
    },
    async logoutController(req: Request, res: Response) {

        const refreshToken = req.cookies?.refreshToken;

        await authService.logout(refreshToken);

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

        sendResponse(res, 200,users, "Users fetched successfully");
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
    }
}