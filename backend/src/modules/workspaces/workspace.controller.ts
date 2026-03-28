import { Request, Response } from "express"
import { sendResponse } from "../../utils/send.response";
import { workspaceService } from "./workspace.service";
import { createWorkspaceDTO } from "./workspace.types";
import { Role } from "@prisma/client";

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
    async  getAllWorkspaces(req: Request, res: Response){
        const role = req.role;
        const userId = req.userId as string;
        let result;
        if(role=== Role.ADMIN) {
            result = await workspaceService.getAllWorkspaces();
        }
        else{
            result = await workspaceService.getAllWokspaceWhereMemberIsActive(userId);
        }
        
        sendResponse(res, 200 , result);
    },
    async  getAllWorkspacesWithFilter(req: Request, res: Response){
        const role = req.role;
        const userId = req.userId as string;
        const filter = req.body;
        let result;
        if(role=== Role.ADMIN) {
            result = await workspaceService.getWorkspaceByFilter(filter);
        }
        else{
            sendResponse(res, 403 , {},"Only Admin can serch using filter")
        }
        
        sendResponse(res, 200 , result);
    },
    async  addWorkspaceMember(req: Request, res: Response){
        const data = req.body;
        const result  = await workspaceService.addWorkspaceMember(data);

        sendResponse(res,200,result, "New Member added");
    },
    async  updateWorkspaceMember(req: Request, res: Response){
        const data = req.body;
        const workspaceMemberId = req.params.workspaceMemberId as string;
        const result  = await workspaceService.updateWorkspaceMemeber(workspaceMemberId,data);

        sendResponse(res,200,result, "Member updated");
    },
    
}