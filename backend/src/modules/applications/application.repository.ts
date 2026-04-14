import { get } from "node:http";
import { prisma } from "../../database/client";
import { CreateApplicationDTO, CreateApplicationOnly } from "./application.types";
import { PrismaClient, Prisma } from "@prisma/client";

type DB = PrismaClient | Prisma.TransactionClient;

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
    getAdminApplications() {
        return prisma.projectApplication.findMany({
            where: {
                status: {
                    in: ["PENDING_ADMIN", "PENDING_COORDINATOR"], // ✅ BOTH
                },
            },
            orderBy: [
                {
                    status: "asc", // optional (we’ll control order better below)
                },
            ],
            include: {
                leader: true,
                members: {
                    include: {
                        user: true,
                    },
                },
                project: true,
            },
        });
    },
    getApplicationById(id: string) {
        return prisma.projectApplication.findUnique({
            where: { id },
            include: {
                members: true
            }
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
    getApplicationMembers(db: DB, filter: any) {
        return db.applicationMember.findMany({
            where: filter
        });
    },
    findUsersAlreadyApplied(projectId: string, userIds: string[]) {
        return prisma.applicationMember.findMany({
            where: {
                userId: { in: userIds },
                application: {
                    projectId
                }
            },
            select: {
                userId: true
            }
        });
    },
}


