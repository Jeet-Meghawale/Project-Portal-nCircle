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
        const result = await projectService.toggleVisibility(projectId);
        if (result === 404) {
            return sendResponse(res, 404, null, "Project not found");
        }
        sendResponse(res, 200, result);
    },
    async listVisible(req: Request, res: Response) {
        const projectId = req.validated?.params?.id;
        const result = await projectService.listVisible(projectId);
        if (result.status === 404) {
            return sendResponse(res, 404, null, "Project not found");
        }
        sendResponse(res, 200, result.data);

    },
    async addTagsToProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.projectId;
        const { tags } = req.body;
        const result = await projectService.addTagsToProject(projectId, tags);
        if (result.status === 404) {
            return sendResponse(res, 404, null, "Project not found");
        }
        sendResponse(res, 200, result.data, "Tags added to project successfully");
    },
    async removeTagsFromProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.projectId;
        const { tags } = req.body;
        const result = await projectService.removeTagsFromProject(projectId, tags);
        if (result.status === 404) {
            return sendResponse(res, 404, null, "Project not found");
        }
        sendResponse(res, 200, result.data, "Tags removed from project successfully");
    },
    async addFileToProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.projectId;
        const file = req.file as Express.Multer.File;
        if (file === undefined || file === null) {
            sendResponse(res, 400, {}, "No file uploaded");
            return;
        };
        const result = await projectService.addFileToProject(projectId, file);

        sendResponse(res, 200, result, "File added to project successfully");
    },
    async removeFileFromProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.projectId;
        const fileId = req.validated?.params?.fileId;
        const result = await projectService.removeFileFromProject(projectId, fileId);
        if (result.status === 404) {
            return sendResponse(res, 404, null, "Project or File not found");
        }
        sendResponse(res, 200, result.data, "File removed from project successfully");

    },
    async getFilesForProject(req: Request, res: Response) {
        const projectId = req.validated?.params?.projectId;
        const result = await projectService.getFilesForProject(projectId);
        sendResponse(res, 200, result, "Files retrieved successfully");
    },
};