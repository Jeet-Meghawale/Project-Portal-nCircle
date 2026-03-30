import { get } from "node:http";
import { threadsRepository } from "./threads.repositories";
import { createThreadInput } from "./threads.types";

export const threadsServices = {
    
    createThread(dto: createThreadInput, userId: string) {
        // check remain if user is in workspace or not and is leader or not
        const data = {
            title: dto.title ?? null,
            description: dto.description ?? null,
            workspaceId: dto.workspaceId ?? null,
            createdBy: userId
        };

        return threadsRepository.createThread(data);
    },
    getThreadById(threadId : string){
        return threadsRepository.getThreadWithId(threadId);
    },
    updateThread(threadId : string , dto : Partial<createThreadInput>){
        const data : any = {}
        if(dto.title){
            data.title = dto.title
        }
        if(dto.description){
            data.description = dto.description
        }
        if(dto.workspaceId){
            data.workspaceId = dto.workspaceId
        }

        return threadsRepository.updateThread(threadId,data);
    },
    getAllThreadsinWorkspace(workspaceId : string){
        return threadsRepository.getAllThreadsinWorkspace(workspaceId);
    }
}
