import { PrismaClient, Prisma, WorkspaceRole } from "@prisma/client";

type DB = PrismaClient | Prisma.TransactionClient;

export const workspaceRepository = {

    async createWorkspace(
        db: DB,
        data: {
            groupId: string;
            projectId: string;
        },
        members: { userId: string; role: WorkspaceRole }[]
    ) {
        const workspace = await db.workspace.create({
            data
        });

        const uniqueMembers = Array.from(
            new Map(members.map(m => [m.userId, m])).values()
        );

        await Promise.all(
            uniqueMembers.map(member =>
                db.workspaceMember.create({
                    data: {
                        workspaceId: workspace.id,
                        userId: member.userId,
                        role: member.role
                    }
                })
            )
        );

        return workspace;
    },

    updateWorkspace(db: DB, id: string, data: any) {
        return db.workspace.update({
            where: { id },
            data
        });
    },

    getWorkspace(db: DB, filter: any) {
        return db.workspace.findMany({
            where: filter
        });
    },

    getWorkspaceById(db: DB, id: string) {
        return db.workspace.findUnique({
            where: { id }
        });
    },

    addWorkspaceMember(db: DB, data: any) {
        return db.workspaceMember.create({ data });
    },

    updateWorkspaceMember(db: DB, id: string, data: any) {
        return db.workspaceMember.update({
            where: { id },
            data
        });
    },

    getWorkspaceMemberByFilter(db: DB, filter: any) {
        return db.workspaceMember.findMany({
            where: filter
        });
    },

    getWorkspaceMemberById(db: DB, id: string) {
        return db.workspaceMember.findUnique({
            where: { id }
        });
    },

    getAllWorkspaceWhereMemberIsActive(db: DB, userId: string) {
        return db.workspace.findMany({
            where: {
                isActive: true,
                members: {
                    some: {
                        userId,
                        isActive: true
                    }
                }
            },
            include: {
                project: true,
                group: true
            }
        });
    },

    getWorkspaceByIdForActiveMember(db: DB, id: string, userId: string) {
        return db.workspace.findFirst({ // ✅ FIXED
            where: {
                id,
                members: {
                    some: {
                        userId,
                        isActive: true
                    }
                }
            }
        });
    },
};