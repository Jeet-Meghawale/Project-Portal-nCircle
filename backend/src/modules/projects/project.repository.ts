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
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }

        });
    },
    updateProject(id: string, data: any) {
        return prisma.project.update({
            where: { id },
            data
        });
    },
    getProjectByIdForAdmin(id: string) {
        return prisma.project.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        applications: true,
                        workspace: true
                    }

                }
            }
        });

    },
    getProjectsForAdmin(filter: any) {
        return prisma.project.findMany({
            where: filter,
            orderBy: { createdAt: "desc" },
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        applications: true,
                        workspace: true
                    }

                }
            }
        });
    },

    addtagstoProject(projectId: string, tags: string[]) {
        return prisma.project.update({
            where: { id: projectId },
            data: {
                tags: {
                    create: tags.map(tag => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag }
                            }
                        }
                    }))
                }
            }
        });
    },
    deletetagfromProject(projectId: string, tags: string[]) {
        return prisma.project.update({
            where: { id: projectId },
            data: {
                tags: {
                    deleteMany: {
                        tagName: { in: tags }
                    }
                }
            }
        });
    },
    createFile(data: any) {
        return prisma.projectFiles.create({
            data
        });
    },
    deleteFile(fileId: string) {
        return prisma.projectFiles.delete({
            where: { id: fileId }
        });
    },
    getFileById(fileId: string) {
        return prisma.projectFiles.findUnique({
            where: { id: fileId }
        });
    },
    getFilesForProject(projectId: string) {
        return prisma.projectFiles.findMany({
            where: { projectId }
        });
    },
    getProjectsForUser(userId: string) {
        return prisma.project.findMany({
            where: {
                OR: [
                    { createdBy: userId },
                    {
                        applications: {
                            some: {
                                OR: [
                                    { leaderId: userId },
                                    { members: { some: { userId } } }
                                ]
                            }
                        }
                    }
                ]
            },
            orderBy: { createdAt: "desc" }
        });
    },
};