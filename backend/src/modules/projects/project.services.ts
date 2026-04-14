import { ProjectVisibility } from "@prisma/client";
import { projectRepository } from "./project.repository"
import { s3, S3_bucket } from "../../config/aws.config";
import path from "node:path";

async function uploadFileToS3(file: Express.Multer.File) {

    const key = `${Date.now()}-${file.originalname}`;

    const params = {
        Bucket: S3_bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();
    return {
        url: result.Location,
        key: result.Key,
        type: file.mimetype,
        name: file.originalname
    };
};
async function deleteFromS3(key: string) {
    await s3.deleteObject({
        Bucket: S3_bucket,
        Key: key,
    }).promise();
}


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
    },
    async addTagsToProject(projectId: string, tags: string[]) {
        const project = await projectRepository.getProjectbyId(projectId);
        if (!project) {
            return { status: 404 };
        }
        const uniqueTags = Array.from(new Set(tags));
        const result = await projectRepository.addtagstoProject(projectId, uniqueTags);
        return { status: 200, data: result };
    },
    async removeTagsFromProject(projectId: string, tags: string[]) {
        const project = await projectRepository.getProjectbyId(projectId);
        if (!project) {
            return { status: 404 };
        }
        const result = await projectRepository.deletetagfromProject(projectId, tags);
        return { status: 200, data: result };
    },
    async addFileToProject(projectId: string, file: Express.Multer.File) {
        const uploadedResult = await uploadFileToS3(file);
        const dto = {
            name: uploadedResult.name,
            path: uploadedResult.url,
            type: uploadedResult.type,
            project: { connect: { id: projectId } }
        }
        return projectRepository.createFile(dto);
    },
    async removeFileFromProject(projectId: string, fileId: string) {
        const file = await projectRepository.getFileById(fileId);
        if (!file) {
            return { status: 404 };
        }
        // delete from s3
        const key = file.path.split('/').slice(-1)[0] as string; // get the last part of the url which is the key
        await deleteFromS3(key);
        // delete form db
        const result = await projectRepository.deleteFile(fileId);
        return { status: 200, data: result };
    },
    async getFilesForProject(projectId: string) {
        const project = await projectRepository.getProjectbyId(projectId);
        if (!project) {
            return { status: 404 };
        }
        const files = await projectRepository.getFilesForProject(projectId);
        return { status: 200, data: files };
    },
    async getMyProjects(userId: string) {
        return projectRepository.getProjectsForUser(userId);
    }

}
