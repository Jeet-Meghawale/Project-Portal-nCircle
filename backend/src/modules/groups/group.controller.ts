import { Request,Response } from "express"
import { groupService } from "./group.service";
import { sendResponse } from "../../utils/send.response";

export const groupController ={
    async createGroup(req:Request,res:Response){
        const dto = req.validated!.body!;
        const result = await groupService.createGroup(dto);
        sendResponse(res,200,result,"Group Created");
    },
    async getGroupsByProjectId(req:Request,res:Response){
        const projectId= req.validated!.params!.projectId ;
        const result = await groupService.getAllGroupsByProject(projectId);

        sendResponse(res,200,result,"Groups Retrived");
    },
    async getAllGroups(req:Request,res:Response){
        const result = await groupService.getAllGroups();
        sendResponse(res,200,result,"All Groups");
    },
    async updateGroup(req:Request,res:Response){
        const id= req.validated!.params!.id ;
        const dto = req.validated!.body;
        const result = await groupService.updateGroup(id,dto);

        sendResponse(res,200,result,"Group Updated Successfully");
    },
    async getGroupsByUserId(req:Request,res:Response){
        const userId = req.validated!.params!.userId  ;
        const result = await groupService.getGroupsByUserId(userId);

        sendResponse(res,200,result,"All groups ")
    },
}