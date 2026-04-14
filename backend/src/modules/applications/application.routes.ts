import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { applicationIdParamSchema, createApplicationSchema, UpdateApplicationDTO } from "../../validators/application.validator";
import { asyncHandler } from "../../utils/async.handler";
import { applicationController } from "./application.controller";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.use(authMiddleware);

router.get(
  "/admin",
  authorize(Role.ADMIN),
  asyncHandler(applicationController.getAdminApplications)
);

router.get(
    "/coordinator",
    authorize(Role.COORDINATOR),
    asyncHandler(applicationController.getCoordinatorApplications)
);
// Get application by Id
router.get(
    "/:applicationId",
    validate({ params: applicationIdParamSchema }),
    asyncHandler(applicationController.getApplicationById)
);


// create application
router.post(
    "/create",
    validate({ body: createApplicationSchema }),
    asyncHandler(applicationController.createApplication)

);

//update application
router.patch(
    "/update/:applicationId",
    validate({ params: applicationIdParamSchema }),
    validate({ body: UpdateApplicationDTO }),
    authorize(Role.COORDINATOR, Role.ADMIN),
    asyncHandler(applicationController.updateApplication)
);

//verify application
router.patch(
    "/verify/:applicationId",
    authorize(Role.COORDINATOR),
    validate({ params: applicationIdParamSchema }),
    asyncHandler(applicationController.verifyApplication)
);

//aprove application
router.patch(
    "/approve/:applicationId",
    authorize(Role.ADMIN),
    validate({ params: applicationIdParamSchema }),
    asyncHandler(applicationController.approveApplication)
);

//cancel application
router.patch(
    "/cancel/:applicationId",
    authorize(Role.COORDINATOR, Role.STUDENT),
    validate({ params: applicationIdParamSchema }),
    asyncHandler(applicationController.cancelApplication)
);

//Reject application
router.patch(
    "/reject/:applicationId",
    authorize(Role.ADMIN),
    validate({ params: applicationIdParamSchema }),
    asyncHandler(applicationController.rejectApplication)
);
export default router;