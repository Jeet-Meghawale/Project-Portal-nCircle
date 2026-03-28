import { application, Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes"
import applicationRoutes from "../modules/applications/application.routes"
import groupRoutes from"../modules/groups/group.routes"
import workspaceRoutes from "../modules/workspaces/workspace.routes"
import reviewsRoutes from "../modules/reviews/reviews.routes"



const router = Router();

router.use("/auth", authRoutes);
router.use("/project",projectRoutes)
router.use("/application",applicationRoutes)
router.use("/group",groupRoutes)
router.use ("/workspace",workspaceRoutes)
router.use("/reviews",)

export default router;