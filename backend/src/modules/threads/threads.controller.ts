import { Request,Response } from "express"
import { threadsServices } from "./threads.services";
import { send } from "node:process";
import { sendResponse } from "../../utils/send.response";

export const threadsControllers = {
    async createThread(req:Request,res:Response){
        const userId = req.userId as string;
        const dto = req.body;
        const result = await threadsServices.createThread(dto,userId);       
        
        sendResponse(res, 201, result, "Thread created successfully");  
    },
    async getThreadById(req:Request,res:Response){
        const {threadId} = req.params as {threadId : string};
        const result = await threadsServices.getThreadById(threadId);
        if(result === null){
            return sendResponse(res, 404, null, "Thread not found");
        };
        sendResponse(res, 200, result, "Thread retrieved successfully");
    },
    async updateThread(req:Request,res:Response){
        const {threadId} = req.params as {threadId : string};
        const dto = req.body;
        const result = await threadsServices.updateThread(threadId,dto);
        sendResponse(res, 200, result, "Thread updated successfully");
    },
    async getAllThreadsinWorkspace(req:Request,res:Response){
        const {workspaceId} = req.params as {workspaceId : string};
        const result = await threadsServices.getAllThreadsinWorkspace(workspaceId);
        
        sendResponse(res, 200, result, "Threads retrieved successfully");
    }
}