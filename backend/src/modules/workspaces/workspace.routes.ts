import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";
import { validate } from "../../middlewares/zod.validator.middleware";
import { createWorkspaceSchema, updateWorkspaceSchema,  workspaceIdParamsSchema } from "../../validators/workspace.validator";
import { asyncHandler } from "../../utils/async.handler";
import { workspaceController } from "./workspace.controller";


const router = Router();

router.use(authMiddleware);

//get Workspace by ID
router.get(
    "/:workspaceId",
    validate({params:workspaceIdParamsSchema}),
    asyncHandler(workspaceController.getWorkspaceById)
)
// get workspace by filter

//get all workspace ADMIN for specific project

// get all workspace where user is active

// Create Workspace
router.post(
    "/",
    authorize(Role.ADMIN),
    validate({ body: createWorkspaceSchema }),
    asyncHandler(workspaceController.createWorkspace)
);


// update Workspace
router.patch(
    "/:workspaceId",
    authorize(Role.ADMIN),
    validate({
        params: workspaceIdParamsSchema,
        body: updateWorkspaceSchema
    }),
    asyncHandler(workspaceController.updateWorkspace)

)
// add Workspace member

// update Workspace member


export default router;