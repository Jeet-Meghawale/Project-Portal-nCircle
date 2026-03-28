import { prisma } from "../../database/client";

export const groupRepository = {
    createGroup(dto: any, members: any) {
        return prisma.$transaction(async (tx) => {
            const group = await tx.group.create(
                { data: dto }
            );
            await Promise.all(
                members.map((member: any) =>
                    tx.groupMember.create({
                        data: {
                            groupId: group.id,
                            userId: member.userId,
                            role: member.role
                        }
                    })
                )
            )
            return group;
        });
    },
    getGroupById(id: string) {
        return prisma.group.findUnique({
            where: { id }
        });
    },
    getGroups(filter: any) {
        return prisma.group.findMany({
            where: filter
        });
    },
    updateGroup(id: string, data: any) {
        return prisma.group.update({
            where: { id },
            data
        });
    },
    createGroupMember(data: any) {
        return prisma.applicationMember.create(
            data
        );
    },
    getGroupsByUserId(userId: string) {
        return prisma.group.findMany({
            where: {
                members: {
                    some: { userId }
                }
            }
        })
    },
}