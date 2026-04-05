import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async.handler";
import { tagsController } from "./tags.controllers";
import { validate } from "../../middlewares/zod.validator.middleware";
import { createTagSchema } from "../../validators/tags.validator";

const router = Router();
router.use(authMiddleware);

router.get(
    "/",
    asyncHandler(tagsController.getAllTags)
)
router.post(
    "/create",
    validate({
        body: createTagSchema
    }),
    asyncHandler(tagsController.createTag)
)
router.get(
    "/:name",
    validate({
        params: createTagSchema
    }),
    asyncHandler(tagsController.getTagByName)
)

router.delete(
    "/:name",
    validate({
        params: createTagSchema
    }),
    asyncHandler(tagsController.deleteTag)
)


export default router;