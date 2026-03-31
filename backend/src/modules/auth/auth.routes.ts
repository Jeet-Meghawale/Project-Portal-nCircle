import { Router } from "express";
import { authController } from "./auth.controller";
import { asyncHandler } from "../../utils/async.handler";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";


const router = Router();

// Post /auth/register
router.post(
    "/register",
    authMiddleware,
    authorize(Role.ADMIN),
    asyncHandler(authController.registerController)
)

// Login /auth/login
router.post(
    "/login",
    asyncHandler(authController.loginController)
)

// Refresh /auth/refresh
router.post(
  "/refresh",
  asyncHandler(authController.refreshController)
);

// Yor info /auth/me
router.get(
  "/me",
  authMiddleware,
  asyncHandler(authController.meController)
);

//logout /auth/logout
router.post(
  "/logout",
  asyncHandler(authController.logoutController)
);

// get all users
router.get(
  "/users",
  authMiddleware,
  authorize(Role.ADMIN),
  asyncHandler(authController.getAllUsers)
);

// get users by filter
router.get(
  "/users/filter",
  authMiddleware,
  authorize(Role.ADMIN),
  asyncHandler(authController.getUsersByFilter)
);
//Register bulk
router.post(
  "/register/bulk",
  authMiddleware,
  authorize(Role.ADMIN),
  asyncHandler(authController.registerBulk)
)
export default router;