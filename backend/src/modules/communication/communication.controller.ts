import { Request, Response } from "express";
import { ThreadCommunicationService, WorkspaceCommunicationService } from "./communication.services";
import { sendResponse } from "../../utils/send.response";

export const ThreadCommunicationController = {
    async createCommunication(req: Request, res: Response) {
        const { threadId, message } = req.body;
        const userId = req.userId as string;
        const dto = { threadId, message};
        const result = await ThreadCommunicationService.createCommunication(dto, userId);

        sendResponse(res, 201, result, "Thread Communication created successfully");

    },
    async getCommunicationsByThreadId(req: Request, res: Response) {
        const { threadId } = req.params as { threadId: string };
        const result = await ThreadCommunicationService.getCommunicationsByThreadId(threadId);
        sendResponse(res, 200, result, "Thread Communications fetched successfully");
    },
    async deleteCommunication(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        await ThreadCommunicationService.deleteCommunication(communicationId);
        sendResponse(res, 200, null, "Thread Communication deleted successfully");
    },
    async updateCommunication(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        const { message } = req.body;
        const result = await ThreadCommunicationService.updateCommunication(communicationId, message);
        sendResponse(res, 200, result, "Thread Communication updated successfully");
    },
    async getCommunicationById(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        const result = await ThreadCommunicationService.getCommunicationById(communicationId);
        sendResponse(res, 200, result, "Communication fetched successfully");
    }
};

export const WorkspaceCommunicationController = {
    // similar to thread communication but with workspaceId instead of threadId
    async createCommunication(req: Request, res: Response) {
        const { workspaceId, message } = req.body;
        const userId = req.userId as string;
        const dto = { workspaceId, message};
        const result = await WorkspaceCommunicationService.createCommunication(dto, userId);
        sendResponse(res, 201, result, "Workspace Communication created successfully");
    },
    async getCommunicationsByWorkspaceId(req: Request, res: Response) {
        const { workspaceId } = req.params as { workspaceId: string };
        const result = await WorkspaceCommunicationService.getCommunicationsByWorkspaceId(workspaceId);
        sendResponse(res, 200, result, "Workspace Communications fetched successfully");
    },
    async deleteCommunication(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        await WorkspaceCommunicationService.deleteCommunication(communicationId);
        sendResponse(res, 200, null, "Workspace Communication deleted successfully");
    },
    async updateCommunication(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        const { message } = req.body;
        const result = await WorkspaceCommunicationService.updateCommunication(communicationId, message);
        sendResponse(res, 200, result, "Workspace Communication updated successfully");
    },
    async getCommunicationById(req: Request, res: Response) {
        const { communicationId } = req.params as { communicationId: string };
        const result = await WorkspaceCommunicationService.getCommunicationById(communicationId);
        sendResponse(res, 200, result, "Workspace Communication fetched successfully");
    }
};
