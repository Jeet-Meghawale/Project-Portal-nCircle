import { application, Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes"
import applicationRoutes from "../modules/applications/application.routes"
import groupRoutes from"../modules/groups/group.routes"
import workspaceRoutes from "../modules/workspaces/workspace.routes"
import reviewsRoutes from "../modules/reviews/reviews.routes"
import threadsRoutes from "../modules/threads/threads.routes"
import communicationRoutes from "../modules/communication/communication.routes"
import fileRoutes from "../modules/files/files.routes"
import tagRoutes from "../modules/tags/tags.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/tags", tagRoutes);
router.use("/project",projectRoutes)
router.use("/application",applicationRoutes)
router.use("/group",groupRoutes)
router.use ("/workspace",workspaceRoutes)
router.use("/reviews", reviewsRoutes)
router.use("/threads",threadsRoutes)
router.use("/communication",communicationRoutes)
router.use("/files",fileRoutes)

export default router;