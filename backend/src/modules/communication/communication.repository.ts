import { Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export const ThreadCommunicationRepository = {
    createCommunication(data: Prisma.CommunicationCreateInput){
        return prisma.communication.create({
            data
        });
    },
    getCommunicationsByThreadId(threadId: string){
        return prisma.communication.findMany({
            where: {
                threadId
            },
            orderBy: {
                createdAt: "asc"
            }
        });

    },
    deleteCommunication(communicationId: string){
        return prisma.communication.delete({
            where: {
                id: communicationId
            }
        });
    },
    updateCommunication(communicationId: string, data: Prisma.CommunicationUpdateInput){
        return prisma.communication.update({
            where: {
                id: communicationId
            },
            data
        });
    },
    getCommunicationById(communicationId: string){
        return prisma.communication.findUnique({
            where: {
                id: communicationId
            }
        });
    },


};

export const WorkspaceCommunicationRepository = {
    // similar to thread communication but with workspaceId instead of threadId
    createCommunication(data: Prisma.WorkspaceCommunicationCreateInput){
        return prisma.workspaceCommunication.create({
            data
        });
    },
    getCommunicationsByWorkspaceId(workspaceId: string){
        return prisma.workspaceCommunication.findMany({
            where: {
                workspaceId
            },
            orderBy: {
                createdAt: "asc"
            }
        });

    },
    deleteCommunication(communicationId: string){
        return prisma.workspaceCommunication.delete({
            where: {
                id: communicationId
            }
        });
    },
    updateCommunication(communicationId: string, data: Prisma.WorkspaceCommunicationUpdateInput){
        return prisma.workspaceCommunication.update({
            where: {
                id: communicationId
            },
            data
        });
    },
    getCommunicationById(communicationId: string){
        return prisma.workspaceCommunication.findUnique({
            where: {
                id: communicationId
            }
        });
    }
};