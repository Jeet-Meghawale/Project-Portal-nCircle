import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { asyncHandler } from "../../utils/async.handler";
import { groupController } from "./group.controller";
import { createGroupSchema, updateGroupSchema } from "../../validators/group.validator";
import { ProjectIdParamSchema } from "../../validators/project.validator";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";
import { userIdParamSchema } from "../../validators/auth.validator";

const router = Router();

router.use(authMiddleware);

// create
router.post(
    "/create",
    validate({ body: createGroupSchema }),
    asyncHandler(groupController.createGroup)
)
// get my 
router.get(
    "/byUserId/:userId",
    validate({ params: userIdParamSchema }),
    asyncHandler(groupController.getGroupsByUserId)
)
//get all group in project
router.get(
    "/byProjectId/:projectId",
    validate({ params: ProjectIdParamSchema }),
    asyncHandler(groupController.getGroupsByProjectId)
)

// get all groups
router.get(
    "/all",
    authorize(Role.ADMIN),
    asyncHandler(groupController.getAllGroups)
)
// update group by id
router.patch(
    "/update/:id",
    authorize(Role.ADMIN),
    validate({
        body: updateGroupSchema,
        params: ProjectIdParamSchema
    }),
    asyncHandler(groupController.updateGroup)
)


export default router;