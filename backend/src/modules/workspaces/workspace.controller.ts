import { Request, Response } from "express"
import { sendResponse } from "../../utils/send.response";
import { workspaceService } from "./workspace.service";
import { createWorkspaceDTO } from "./workspace.types";
import { Role } from "@prisma/client";
import { workspaceRepository } from "./workspace.repository";


export const workspaceController = {
    async createWorkspace(req: Request, res: Response) {
        const { groupId, projectId, members } = req.body;
        const data = { groupId, projectId };
        const result = workspaceService.createWorkspace(data, members);

        sendResponse(res, 200, result, "WorkspaceCreated");
    },
    async updateWorkspace(req: Request, res: Response) {
        const workspaceId = req.params.workspaceId as string;
        const dto = req.body;

        const result = workspaceService.updateWorkspace(workspaceId, dto);

        sendResponse(res, 200, result, "Workspace Updated");
    },
    async getWorkspaceById(req: Request, res: Response) {
        const role = req.role;
        const workspaceId = req.params.workspaceId as string;
        const userId = req.userId as string;
        let result ;
        if (role === Role.ADMIN) {
             result = await workspaceService.getWorkspaceById(workspaceId);
        } else {
             result = await workspaceService.checkActiveUserAndGetWorkspaceById(workspaceId, userId);
        }
        if(result===null){ 
            sendResponse(res , 404,{}, "Workspace Not Found for current user")
        };
        sendResponse(res ,200 , result , "");
    },
}