import { prisma } from "../../database/client";
import { groupRepository } from "./group.repository";
import { createGroupDTO, createGroupDTONoMembers, updateGroupDTO } from "./group.types";

import { PrismaClient, Prisma, MemberRole } from "@prisma/client";

type DB = PrismaClient | Prisma.TransactionClient;

export const groupService = {
    async createGroup(dto: createGroupDTO) {
        const { projectId , coordinatorId, applicationId, members } = dto;
        const createGroupData:createGroupDTONoMembers = {
            projectId,
            coordinatorId,
            applicationId
        }
        const data ={}
        return groupRepository.createGroup(prisma, createGroupData, members);
    },
    async getAllGroupsByProject(projectId: string) {
        return groupRepository.getGroups(prisma, { projectId });
    },
    async getAllGroups() {
        return groupRepository.getGroups(prisma, {});
    },
    async updateGroup(id: string, data: updateGroupDTO) {
        return groupRepository.updateGroup(prisma, id, data);
    },
    async getGroupsByUserId(id: string) {
        return groupRepository.getGroupsByUserId(prisma, id);
    },
    async createGroupTx(
        db: DB,
        dto: {
            projectId: string;
            coordinatorId: string;
            applicationId: string;
            members: { userId: string; role: MemberRole }[];
        }
    ) {
        const { projectId, coordinatorId, applicationId, members } = dto;

        return groupRepository.createGroup(db, {
            projectId,
            coordinatorId,
            applicationId
        }, members);
    }
}