import { Request, Response } from "express";
import { projectService } from "./project.services";
import { sendResponse } from "../../utils/send.response";

export const projectController = {

    async createProject(req: Request, res: Response) {

        const adminId = req.userId!;

        const project = await projectService.createProject(
            adminId,
            req.body
        );

        res.status(201).json({
            success: true,
            data: project
        });
    },
    async listProjects(req: Request, res: Response) {
        const projects = await projectService.listProjects();

        res.json({
            success: true,
            data: projects
        });

    },
    async listProjectsAdmin(req: Request, res: Response) {
        const projects = await projectService.listProjectsAdmin();
        sendResponse(res, 200, projects, "Admin Project List");
    },
    async getProjectByIdAdmin(req: Request, res: Response) {
        const projectId = req.validated?.params?.id;
        const project = await projectService.getProjectByIdForAdmin(projectId);

        sendResponse(res, 200, project)
    },
    async updateProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.id;
        const dto = req.validated?.body;
        const updatedProject = await projectService.updateProject(projectId, dto);

        sendResponse(res, 200, updatedProject, "Project Updated Successfully");

    },
    async toggleVisibility(req: Request, res: Response) {
        const projectId = req.validated?.params?.id;
        const result = projectService.toggleVisibility(projectId);

        sendResponse(res, 200, result);
    },
    async listVisible(req: Request, res: Response) {
        const projectId = req.validated?.params?.id;
        const result = projectService.listVisible(projectId);

        sendResponse(res, 200, result);

    }
}