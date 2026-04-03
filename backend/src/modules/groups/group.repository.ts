import { PrismaClient, Prisma, MemberRole } from "@prisma/client";

type DB = PrismaClient | Prisma.TransactionClient;

export const groupRepository = {

    async createGroup(
        db: DB,
        data: {
            projectId: string;
            coordinatorId: string;
            applicationId: string;
        },
        members: { userId: string; role: MemberRole }[]
    ) {
        return db.group.create({
            data: {
                ...data,
                members: {
                    create: members.map(m => ({
                        userId: m.userId,
                        role: m.role
                    }))
                }
            },
            include: {
                members: true
            }
        });
    },

    getGroupById(db: DB, id: string) {
        return db.group.findUnique({
            where: { id }
        });
    },

    getGroups(db: DB, filter: any) {
        return db.group.findMany({
            where: filter
        });
    },

    updateGroup(db: DB, id: string, data: any) {
        return db.group.update({
            where: { id },
            data
        });
    },

    createGroupMember(db: DB, data: any) {
        return db.groupMember.create({ data }); // ✅ FIXED
    },

    getGroupsByUserId(db: DB, userId: string) {
        return db.group.findMany({
            where: {
                members: {
                    some: { userId }
                }
            }
        });
    },
};