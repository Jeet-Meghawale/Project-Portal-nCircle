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
    updateWorkspace(id: string, data: any) {
        return prisma.workspace.update({
            where: { id },
            data
        })
    },
    getWorkspace(filter: any) {
        return prisma.workspace.findMany({
            where: filter
        }
        )
    },
    getWorkspaceById(id: string) {
        return prisma.workspace.findUnique({
            where: { id }
        });
    },
    addWorkspaceMember(data: any) {
        return prisma.workspaceMember.create({
            data
        })
    },
    updateWorkspaceMember(id: string, data: any) {
        return prisma.workspace.update({
            where: { id },
            data
        })
    },
    getWorkspaceMemberByFilter(filter: any) {
        return prisma.workspaceMember.findMany({
            where: filter
        })
    },
    getWorkspaceMemberById(id: string) {
        return prisma.workspaceMember.findUnique({
            where: { id }
        })
    },
    getAllWokspaceWhereMemberIsActive(userId: string) {
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
    getWorkspaceByIdForActiveMember(id: string, userId: string) {
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