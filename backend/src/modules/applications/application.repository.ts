import { prisma } from "../../database/client";
import { CreateApplicationDTO, CreateApplicationOnly } from "./application.types";

export const applicationRepository = {
    createApplication(create: CreateApplicationOnly, members: any) {
        return prisma.$transaction(async (tx) => {
            const application = await tx.projectApplication.create({
                data: create
            });
            await Promise.all(
                members.map((member: any) =>
                    tx.applicationMember.create({
                        data: {
                            applicationId: application.id,
                            userId: member.userId,
                            role: member.role
                        }
                    })
                )
            )
            return application;
        });
    },
    getApplicationById(id: string) {
        return prisma.projectApplication.findUnique({
            where: { id }
        });
    },
    getApplication(filter: any) {
        return prisma.projectApplication.findMany({
            where: filter
        });
    },
    updateApplication(id: string, data: any) {
        return prisma.projectApplication.update({
            where: { id },
            data
        });
    },
    createApplicationMember(dto: any) {
        return prisma.applicationMember.create(
            dto
        );
    },


}