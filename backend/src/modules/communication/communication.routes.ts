import { Router } from "express";
import { validate } from "../../middlewares/zod.validator.middleware";
import { communicationIdParamSchema, createCommunicationInputSchema, workspaceCommunicationInputSchema } from "../../validators/communication.validator";
import { threadIdParamSchema } from "../../validators/threads.validator";
import { asyncHandler } from "../../utils/async.handler";
import { ThreadCommunicationController, WorkspaceCommunicationController } from "./communication.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

/*
Thread Communication Routes
*/

// get all communications for a thread
router.get(
    "/thread/:threadId",
    validate({ params: threadIdParamSchema }),
    asyncHandler(ThreadCommunicationController.getCommunicationsByThreadId)
)
// get a single communication by id communicationId
router.get(
    "/thread/:communicationId",
    validate({ params: communicationIdParamSchema }),
    asyncHandler(ThreadCommunicationController.getCommunicationById)
)

// create a communication
router.post(
    "/thread",
    validate({
        body: createCommunicationInputSchema
    }),
    asyncHandler(ThreadCommunicationController.createCommunication)
)
// update a communication
router.patch(
    "/thread/:communicationId",
    validate({
        body: createCommunicationInputSchema.partial(),
        params: communicationIdParamSchema
    }),
    asyncHandler(ThreadCommunicationController.updateCommunication)
)

// delete a communication 
router.delete(
    "/thread/:communicationId",
    validate({ params: communicationIdParamSchema }),
    asyncHandler(ThreadCommunicationController.deleteCommunication)
)









/*****************************

Workspace Communication Routes

******************************/

// get all communications for a workspace
router.get(
    "/workspace/:workspaceId",
    validate({ params: threadIdParamSchema }), // we can reuse the same schema since both threadId and workspaceId are just uuid strings
    asyncHandler(WorkspaceCommunicationController.getCommunicationsByWorkspaceId)
)

// get a single communication by id communicationId
router.get(
    "/workspace/:communicationId",
    validate({ params: communicationIdParamSchema }),
    asyncHandler(WorkspaceCommunicationController.getCommunicationById)
)

// create a communication
router.post(
    "/workspace",
    validate({
        body: workspaceCommunicationInputSchema
    }),
    asyncHandler(WorkspaceCommunicationController.createCommunication)
)
// update a communication
router.patch(
    "/workspace/:communicationId",
    validate({
        body: workspaceCommunicationInputSchema.partial(),
        params: communicationIdParamSchema
    }),
    asyncHandler(WorkspaceCommunicationController.updateCommunication)
)
// delete a communication
router.delete(
    "/workspace/:communicationId",
    validate({ params: communicationIdParamSchema }),
    asyncHandler(WorkspaceCommunicationController.deleteCommunication)
)

export default router;  