import { workspaceRepository } from "./workspace.repository"
import { updateWorkspaceDTO } from "./workspace.types";

export const workspaceService = {
    async getWorkspaceById(id: string) {
        return workspaceRepository.getWorkspaceById(id);
    },
    async getWorkspaceByFilter(filter: any) {
        return workspaceRepository.getWorkspace(filter);
    },
    async createWorkspace(data: any, members: any) {
        return workspaceRepository.createWorkspace(data, members);
    },
    async updateWorkspace(id:string , data : any){
        return workspaceRepository.updateWorkspace(id,data);
    },
    async addWorkspaceMember(data : any){
        return workspaceRepository.addWorkspaceMember(data);
    },
    async updateWorkspaceMemeber(id:string , dto:updateWorkspaceDTO){
        return workspaceRepository.updateWorkspaceMember(id,dto);
    },
    async checkActiveUserAndGetWorkspaceById(id:string,userId  :string){
        return workspaceRepository.getWorkspaceByIdForActiveMember(id,userId);
    },
}