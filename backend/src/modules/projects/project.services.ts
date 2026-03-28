import { ProjectVisibility } from "@prisma/client";
import { projectRepository } from "./project.repository";
import { ApiError } from "../../utils/api.error";

export const projectService={
    async createProject(adminId:string, dto:any){
        return projectRepository.createrProject({
            ...dto,
            createdBy:adminId
        });
    },
    async listProjectsAdmin(){
        return projectRepository.getProjects({});
        
    },
    async listProjects(){
        return projectRepository.getProjects({
            visibility : ProjectVisibility.LISTED,
            isActive : true
        });
    },
    async getProject(id:string){
        return projectRepository.getProjectbyId(id);
    },
    async getListedProject(id:string){
        
    },
    async updateProject(id:string , dto: any){
        return projectRepository.updateProject(id,dto);
    },
    async toggleVisibility(projectId: string){
        const project = await projectRepository.getProjectbyId(projectId);
        if(!project) {
            throw new ApiError(404,"Project not found");
        }
        const data={
            visibility : (project.visibility===ProjectVisibility.LISTED) ? ProjectVisibility.UNLISTED : ProjectVisibility.LISTED 
        }
        return projectRepository.updateProject(projectId,data);
        
    },
    async listVisible(projectid: string){
        const project = await projectRepository.getProjectbyId(projectid);
        if(!project) {
            throw new ApiError(404 ,"Project not found");
        }
        if(project.visibility === ProjectVisibility.UNLISTED){
            throw new ApiError(404 ,"Project not found");    
        }
        return project;
    },
}
