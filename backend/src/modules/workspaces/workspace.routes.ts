import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";
import { validate } from "../../middlewares/zod.validator.middleware";
import { addWorkspaceMemberSchema, createWorkspaceSchema, updateWorkspaceMemberSchema, updateWorkspaceSchema, workspaceIdParamsSchema } from "../../validators/workspace.validator";
import { asyncHandler } from "../../utils/async.handler";
import { workspaceController } from "./workspace.controller";


const router = Router();

router.use(authMiddleware);

//get Workspace by ID
router.get(
    "/:workspaceId",
    validate({ params: workspaceIdParamsSchema }),
    asyncHandler(workspaceController.getWorkspaceById)
)
// get workspace by filter
router.get(
    "/byFilter",
    authorize(Role.ADMIN),
    validate({ body: updateWorkspaceSchema }),
    asyncHandler(workspaceController.getAllWorkspacesWithFilter)
);

//get all workspace 
router.get(
    "/all",
    asyncHandler(workspaceController.getAllWorkspaces)
);

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
router.post(
    "/member",
    authorize(Role.ADMIN),
    validate({body:addWorkspaceMemberSchema}),
    asyncHandler(workspaceController.addWorkspaceMember)

)
// update Workspace member
router.patch(
    "/member/:workspaceMemberId",
    authorize(Role.ADMIN),
    validate({
        params : workspaceIdParamsSchema, // since bot are uuid we can use schema
        body :updateWorkspaceMemberSchema
    })
)

export default router;