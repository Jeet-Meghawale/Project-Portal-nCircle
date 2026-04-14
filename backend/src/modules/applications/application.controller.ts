import { Request, Response } from "express";
import { applicationService } from "./application.service";
import { sendResponse } from "../../utils/send.response";
import { MemberRole } from "@prisma/client";
import { CreateApplicationDTO, CreateApplicationServiceInput } from "./application.types";
import { string } from "zod";

export const applicationController = {
    async getAdminApplications(req: Request, res: Response) {
        const result = await applicationService.getAdminApplications();

        sendResponse(res, 200, result, "Admin Applications");
    },
    async getApplicationById(req: Request, res: Response) {
        const id = req.validated!.params!.applicationId;
        const result = await applicationService.getApplicationById(id);

        sendResponse(res, 200, result);
    },
    async createApplication(req: Request, res: Response) {
        const leaderId = req.userId as string;
        const body: CreateApplicationDTO = req.validated!.body;

        //adding leader to members 
        const members = body.members.some(m => m.userId === leaderId)
            ? body.members
            : [
                ...body.members,
                { userId: leaderId, role: MemberRole.LEADER }
            ];
        const serviceInput: CreateApplicationServiceInput = {
            leaderId,
            coordinatorId: body.coordinatorId,
            projectId: body.projectId,
            proposed_solution: body.proposed_solution,
            members
        }
        const result = await applicationService.createApplication(serviceInput);
        if (result === null) sendResponse(res, 500, {}, "Application creation failed");
        if (typeof result === "string") sendResponse(res, 400, {}, result);
        else
            sendResponse(res, 200, result, "Application Created");

    },
    async verifyApplication(req: Request, res: Response) {
        const id = req.validated!.params!.applicationId;
        const result = applicationService.verifyApplication(id);
        if (typeof result === "string")
            sendResponse(res, 403, {}, result);
        else
            sendResponse(res, 200, result, "Application Verified");
    },
    async approveApplication(req: Request, res: Response) {
        const userId = req.userId!;
        const applicationId = req.validated!.params!.applicationId;

        const result = applicationService.approveApplication(applicationId, userId);
        if (typeof result === "string")
            sendResponse(res, 403, {}, result);
        else
            sendResponse(res, 200, result, "Application Approved");
    },
    async cancelApplication(req: Request, res: Response) {
        const id = req.validated!.params!.applicationId;
        const userId = req.userId!
        const result = await applicationService.cancelApplication(id, userId);

        if (typeof result === "string")
            sendResponse(res, 403, {}, result);
        else
            sendResponse(res, 200, result, "Application Canceled");
    },
    async rejectApplication(req: Request, res: Response) {
        const id = req.validated!.params!.applicationId;
        const result = await applicationService.rejectApplication(id);
        sendResponse(res, 200, result, "Application Rejected");
    },
    async updateApplication(req: Request, res: Response) {
        const id = req.validated!.params!.applicationId
        const dto = req.validated!.body

        const result = await applicationService.updateApplication(id, dto);
        if (typeof result === "string")
            sendResponse(res, 403, {}, result);
        else
            sendResponse(res, 200, result, "Application updated")
    },
    async getCoordinatorApplications(req: Request, res: Response) {
        console.log("Controller: Fetching coordinator applications...");
        const coordinatorId = req.userId!;

        const result = await applicationService.getCoordinatorApplications(coordinatorId);

        sendResponse(res, 200, result, "Coordinator Applications");
    }
}