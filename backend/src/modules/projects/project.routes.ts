import { Router } from "express";
import { authorize } from "../../middlewares/rbac.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { addTagsSchema, createProjectSchema, ProjectIdParamSchema, updateProjectSchema } from "../../validators/project.validator";
import { projectController } from "./project.controller";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/async.handler";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/uploads.middleware";

const router = Router();

router.use(authMiddleware);

// List Project Admin
router.get(
    "/list-admin",
    authorize(Role.ADMIN),
    asyncHandler(projectController.listProjectsAdmin)
)


// List Project stud,coor
router.get(
    "/list",
    asyncHandler(projectController.listProjects)
)


// create Project
router.post(
    "/create",
    authorize("ADMIN"),
    validate({ body: createProjectSchema }),
    asyncHandler(projectController.createProject)
)


// Update Project details + status Remark
router.patch(
    "/update/:projectId",
    authorize(Role.ADMIN),
    validate({
        body: updateProjectSchema,
        params: ProjectIdParamSchema
    }),
    asyncHandler(projectController.updateProject)
)

// Toggle visibility of project + status Remark

router.patch(
    "/toggle-visibility/:projectId",
    authorize(Role.ADMIN),
    validate({ params: ProjectIdParamSchema }),
    asyncHandler(projectController.toggleVisibility)
)

// get Project by Id admin

router.get(
    "/admin/:projectId",
    authorize(Role.ADMIN),
    validate({ params: ProjectIdParamSchema }),

    asyncHandler(projectController.getProjectByIdAdmin)
)

// get Project by id (visible only)
router.get(
    "/:projectId",
    validate({ params: ProjectIdParamSchema }),

    asyncHandler(projectController.listVisible)
)

// add tags to project
router.post(
    "/:projectId/tags",
    validate({
        params: ProjectIdParamSchema,
        body: addTagsSchema
    }),
    asyncHandler(projectController.addTagsToProject)
)

// remove tags from project
router.delete(
    "/:projectId/tags",
    validate({
        params: ProjectIdParamSchema,
        body: addTagsSchema
    }),
    asyncHandler(projectController.removeTagsFromProject)
)


// add file to projectId
router.post(
    "/:projectId/files",
    validate({ params: ProjectIdParamSchema }),
    authorize(Role.ADMIN),
    upload.single("file"),
    asyncHandler(projectController.addFileToProject)
)

// remove file from projectId
router.delete(
    "/:projectId/files/:fileId",
    validate({
        params: ProjectIdParamSchema
    }),
    authorize(Role.ADMIN),
    asyncHandler(projectController.removeFileFromProject)
)

// get all files for projectId
router.get(
    "/:projectId/files",
    validate({ params: ProjectIdParamSchema }),
    asyncHandler(projectController.getFilesForProject)
)

// get my projects
router.get(
    "/my",
    asyncHandler(projectController.getMyProjects)
)
// count of all Project

// count of listed Projects


export default router;