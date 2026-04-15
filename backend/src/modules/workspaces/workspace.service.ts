import { prisma } from "../../database/client";
import { workspaceRepository } from "./workspace.repository"
import { addWorkspaceMemberDTO, updateWorkspaceDTO } from "./workspace.types";
import { PrismaClient, Prisma, WorkspaceRole } from "@prisma/client";

type DB = PrismaClient | Prisma.TransactionClient;

export const workspaceService = {
    async getWorkspaceById(id: string) {
        return workspaceRepository.getWorkspaceById(prisma, id);
    },
    async getWorkspaceByFilter(filter: any) {
        return workspaceRepository.getWorkspace(prisma, filter);
    },
    async createWorkspace(data: any, members: any) {
        return workspaceRepository.createWorkspace(prisma, data, members);
    },
    async updateWorkspace(id: string, data: any) {
        return workspaceRepository.updateWorkspace(prisma, id, data);
    },
    async addWorkspaceMember(data: addWorkspaceMemberDTO) {
        return workspaceRepository.addWorkspaceMember(prisma, data);
    },
    async updateWorkspaceMemeber(id: string, dto: updateWorkspaceDTO) {
        return workspaceRepository.updateWorkspaceMember(prisma, id, dto);
    },
    async checkActiveUserAndGetWorkspaceById(id: string, userId: string) {
        return workspaceRepository.getWorkspaceByIdForActiveMember(prisma, id, userId);
    },
    async getAllWorkspaces() {
        return workspaceRepository.getWorkspace(prisma, {});
    },
    async getAllWokspaceWhereMemberIsActive(userId: string) {
        return workspaceRepository.getAllWorkspaceWhereMemberIsActive(prisma, userId);
    },
    async createWorkspaceTx(
        db: DB,
        data: {
            groupId: string;
            projectId: string;
        },
        members: { userId: string; role: WorkspaceRole }[]
    ) {
        return workspaceRepository.createWorkspace(db, data, members);
    }

}