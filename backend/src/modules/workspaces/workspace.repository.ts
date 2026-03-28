import { prisma } from "../../database/client";

export const workspaceRepository = {
    async createWorkspace(data: any, members: any) {
        return prisma.$transaction(async (tx) => {
            const workspace = await tx.workspace.create(
                data
            );
            await Promise.all(
                members.map((member: any) =>
                    tx.workspaceMember.create({
                        data: {
                            workspaceId: workspace.id,
                            userId: member.userId,
                            role: member.role
                        }
                    })
                )
            )
            return workspace;
        });
    },
    async updateWorkspace(id: string, data: any) {
        return prisma.workspace.update({
            where: { id },
            data
        })
    },
    async getWorkspace(filter: any) {
        return prisma.workspace.findMany({
            where: filter
        }
        )
    },
    async getWorkspaceById(id: string) {
        return prisma.workspace.findUnique({
            where: { id }
        });
    },
    async addWorkspaceMember(data: any) {
        return prisma.workspaceMember.create({
            data
        })
    },
    async updateWorkspaceMember(id: string, data: any) {
        return prisma.workspaceMember.update({
            where: { id },
            data
        })
    },
    async getWorkspaceMemberByFilter(filter: any) {
        return prisma.workspaceMember.findMany({
            where: filter
        })
    },
    async getWorkspaceMemberById(id: string) {
        return prisma.workspaceMember.findUnique({
            where: { id }
        })
    },
    async getAllWokspaceWhereMemberIsActive(userId: string) {
        return prisma.workspace.findMany({
            where: {
                isActive: true, // workspace active
                members: {
                    some: {
                        userId: userId,
                        isActive: true // member active
                    }
                }
            },
            include: {
                project: true,
                group: true
            }
        });
    },
    async getWorkspaceByIdForActiveMember(id: string, userId: string) {
        return prisma.workspace.findUnique({
            where: {
                id,
                members: {
                    some: {
                        userId: userId,
                        isActive: true // member active

                    }
                }
            }
        });
    },
    
}