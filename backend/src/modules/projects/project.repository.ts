import { prisma } from "../../database/client";

export const projectRepository = {
    createrProject(data: any) {
        return prisma.project.create({
            data
        });
    },
    getProjects(filter: any) {
        return prisma.project.findMany({
            where: filter,
            orderBy: { createdAt: "desc" }
        });
    },
    getProjectbyId(id: string) {
        return prisma.project.findUnique({
            where: { id }
        });
    },
    updateProject(id: string, data: any) {
        return prisma.project.update({
            where: { id },
            data
        });
    },
    

}