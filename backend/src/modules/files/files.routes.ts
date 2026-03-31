import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);


// upload file

// delete file



export default router;