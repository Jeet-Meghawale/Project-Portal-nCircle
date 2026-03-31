import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/uploads.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { threadIdParamSchema } from "../../validators/threads.validator";
import { asyncHandler } from "../../utils/async.handler";
import { file } from "zod";
import { FilesController } from "./files.controller";
import { fileIdParamSchema } from "../../validators/files.validator";

const router = Router();

router.use(authMiddleware);


// upload file
router.post(
    "/:threadId",
    validate({ params : threadIdParamSchema }),
    upload.single("file"), // single is for uploading sinle file we can use array for multiple files
    asyncHandler(FilesController.uploadFile)

)
// delete file
router.delete(
    "/:fileId",
    validate({ params : fileIdParamSchema }),
    asyncHandler(FilesController.deleteFile)
)


export default router;