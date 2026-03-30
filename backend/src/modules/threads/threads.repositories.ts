import { Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export const threadsRepository = {
    createThread(data : Prisma.ThreadUncheckedCreateInput){
        return prisma.thread.create({
            data
        });
    },
    getAllThreadsinWorkspace(workspaceId : string){
        return prisma.thread.findMany({
            where : {workspaceId}
        });
    },
    updateThread(id:string ,data : Prisma.ThreadUncheckedUpdateInput){
        return prisma.thread.update({
            where :{id},
            data
        });
    },
    getThreadWithId(id :string){
        return prisma.thread.findUnique({
            where : {id}
        });
    },
    
}