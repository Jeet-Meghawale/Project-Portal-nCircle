import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { threadsControllers } from "./threads.controller";
import { validate } from "../../middlewares/zod.validator.middleware";
import { createThreadSchema, threadIdParamSchema } from "../../validators/threads.validator";
import { asyncHandler } from "../../utils/async.handler";

const router = Router();

router.use(authMiddleware);


// create thread in workspace
router.post(
    "/",
    validate({ body: createThreadSchema }),
    asyncHandler(threadsControllers.createThread)
);
// get all threads in workspace
router.get(
    "/workspace/:workspaceId",
    validate({ params: threadIdParamSchema }),
    asyncHandler(threadsControllers.getAllThreadsinWorkspace)
);
// get thread by id
router.get(
    "/:threadId",
    validate({ params: threadIdParamSchema }),
    asyncHandler(threadsControllers.getThreadById)
);

// update thread
router.patch(
    "/:threadId",
    validate({
        params: threadIdParamSchema,
        body: createThreadSchema.partial()
    }),
    asyncHandler(threadsControllers.updateThread)
);


export default router;