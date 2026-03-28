import { prisma } from "../../database/client";
import { groupRepository } from "./group.repository";
import { createGroupDTO, updateGroupDTO } from "./group.types";


export const groupService={
    async createGroup(dto : createGroupDTO){
        const {projectId,coordinatorId,applicationId,members}= dto;
        const createGroupData={
            projectId,
            coordinatorId,
            applicationId
        }

        return groupRepository.createGroup(createGroupData,members)
    },
    async getAllGroupsByProject(projectId:string){
        return groupRepository.getGroups(projectId);
    },
    async getAllGroups(){
        return groupRepository.getGroups({});
    },
    async updateGroup(id:string, data:updateGroupDTO){
        return groupRepository.updateGroup(id,data);
    },
    async getGroupsByUserId(id:string){
        return groupRepository.getGroupsByUserId (id);
    },
}