import { ProjectVisibility } from "@prisma/client";
import { projectRepository } from "./project.repository";
import { ApiError } from "../../utils/api.error";

export const projectService = {
    async createProject(adminId: string, dto: any) {
        return projectRepository.createrProject({
            ...dto,
            createdBy: adminId
        });
    },
    async listProjectsAdmin() {
        return projectRepository.getProjectsForAdmin({});

    },
    async listProjects() {
        return projectRepository.getProjects({
            visibility: ProjectVisibility.LISTED,
            isActive: true
        });
    },
    async getProject(id: string) {
        return projectRepository.getProjectbyId(id);
    },
    async getListedProject(id: string) {

    },
    async updateProject(id: string, dto: any) {
        return projectRepository.updateProject(id, dto);
    },
    async toggleVisibility(projectId: string) {
        const project = await projectRepository.getProjectbyId(projectId);
        if (!project) {
            return 404;
        }
        const data = {
            visibility: (project.visibility === ProjectVisibility.LISTED) ? ProjectVisibility.UNLISTED : ProjectVisibility.LISTED
        }
        return projectRepository.updateProject(projectId, data);

    },
    async listVisible(projectid: string) {
        const project = await projectRepository.getProjectbyId(projectid);
        if (!project) {

            return { status: 404 };

        }
        if (project.visibility === ProjectVisibility.UNLISTED) {

            return { status: 404 };
        }
        return {
            status: 200,
            data: project
        };
    },
    getProjectByIdForAdmin(id: string) {
        return projectRepository.getProjectByIdForAdmin(id);
    }
}
