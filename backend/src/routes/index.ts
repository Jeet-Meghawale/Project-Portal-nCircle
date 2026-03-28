import { application, Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes"
import applicationRoutes from "../modules/applications/application.routes"
import groupRoutes from"../modules/groups/group.routes"
import workspaceRoutes from "../modules/workspaces/workspace.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/project",projectRoutes)
router.use("/application",applicationRoutes)
router.use("/group",groupRoutes)
router.use ("/workspace",workspaceRoutes)


export default router;