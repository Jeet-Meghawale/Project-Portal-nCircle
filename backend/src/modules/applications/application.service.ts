import { ApplicationStatus, MemberRole, WorkspaceRole } from "@prisma/client";
import { applicationRepository } from "./application.repository";
import { ApprovedApplication, CreateApplicationServiceInput, UpdateApplicationServiceInput } from "./application.types";
import { ApiError } from "../../utils/api.error";
import { groupService } from "../groups/group.service";
import { workspaceService } from "../workspaces/workspace.service";
import { prisma } from "../../database/client";





const mapToWorkspaceRole = (role: MemberRole): WorkspaceRole => {
    switch (role) {
        case MemberRole.LEADER:
            return WorkspaceRole.LEADER;

        case MemberRole.MEMBER:
            return WorkspaceRole.MEMBER;

        default:
            throw new Error("Invalid member role");
    }
};


export const applicationService = {
    async getAdminApplications() {
        return await applicationRepository.getAdminApplications();
    },
    async getApplicationById(id: string) {
        return await applicationRepository.getApplicationById(id);
    },
    async createApplication(data: CreateApplicationServiceInput) {
        const { leaderId, coordinatorId, projectId, members, proposed_solution } = data;
        const create = {
            leaderId,
            coordinatorId,
            projectId,
            proposed_solution 
        }
        // remove duplicates
        const uniqueMembers = Array.from(
            new Map(members.map(m => [m.userId, m])).values()
        );

        // ensure  leader exist
        const finalMembers = uniqueMembers.some(m => m.userId === leaderId)
            ? uniqueMembers
            : [...uniqueMembers, { userId: leaderId, role: MemberRole.LEADER }];

        //max 7 members
        if (finalMembers.length > 7) {
            return "Maximum 7 members allowed";
        }

        const userIds = finalMembers.map(m => m.userId);

        const alreadyAppliedUsers =
            await applicationRepository.findUsersAlreadyApplied(projectId, userIds);

        if (alreadyAppliedUsers.length > 0) {
            const ids = alreadyAppliedUsers.map(u => u.userId);
            return `These users already applied to this project: ${ids.join(", ")}`;
        }
        return await applicationRepository.createApplication(create, finalMembers);

    },
    async verifyApplication(id: string) {
        const application = await applicationRepository.getApplicationById(id);
        if (application?.status === ApplicationStatus.PENDING_COORDINATOR) {

            const data = {
                status: ApplicationStatus.PENDING_ADMIN,
                verifiedAt: new Date()
            };

            const group = await this.handleVerify(application);
            const updatedApplication = await applicationRepository.updateApplication(id, data);
            return {
                application: updatedApplication,
                group
            };
        }

        if (application?.status === ApplicationStatus.PENDING_ADMIN || application?.status === ApplicationStatus.APPROVED) {
            return "Application already verified"
        }
        if (application?.status === ApplicationStatus.REJECTED) {
            return "Cannot verify rejected application"
        }
        if (application?.status === ApplicationStatus.CANCELLED) {
            return "Application canceled"
        }
        return "Application not found";


    },
    async approveApplication(id: string, userId: string) {

        const application = await applicationRepository.getApplicationById(id);
        if (application?.status === ApplicationStatus.PENDING_ADMIN) {

            const data = {
                status: ApplicationStatus.APPROVED,
                approvedAt: new Date(),
                approvedBy: userId,
                isApproved: true
            }
            this.handleApproval(application);
            return applicationRepository.updateApplication(id, data);
        }

        if (application?.status === ApplicationStatus.CANCELLED) {
            return "Application canceled"
        }
        if (application?.status === ApplicationStatus.REJECTED) {
            return "Cannot approve rejected application"
        }
        if (application?.status === ApplicationStatus.PENDING_COORDINATOR) {
            return "Application not verified yet"
        }
        if (application?.status === ApplicationStatus.APPROVED) {
            return "Application already approved"
        }
        return "Application not found";



    },
    async cancelApplication(id: string, userId: string) {
        const application = await applicationRepository.getApplicationById(id);
        if (application === null) return "Application not found";

        if (application?.leaderId !== userId) {
            return "You are not the Project Leader";
        }
        if (application.status === ApplicationStatus.PENDING_COORDINATOR) {

            const data = {
                status: ApplicationStatus.CANCELLED,
                isApproved: false
            }
            return applicationRepository.updateApplication(id, data);
        }
        else
            return "Cannot Cancel application now";
    },
    async rejectApplication(id: string) {
        const data = {
            isApproved: false,
            status: ApplicationStatus.REJECTED,
        }
        return applicationRepository.updateApplication(id, data);
    },
    async updateApplication(id: string, dto: UpdateApplicationServiceInput) {
        const application = await applicationRepository.getApplicationById(id);
        if (application === null) return "Application not found";

        if (application.status === ApplicationStatus.PENDING_COORDINATOR)
            return applicationRepository.updateApplication(id, dto);

        else
            return "Cannot Update Application now";


    },

    async handleApproval(application: ApprovedApplication) {
        return prisma.$transaction(async (tx) => {

            const dbMembers = await applicationRepository.getApplicationMembers(tx, {
                applicationId: application.id
            });

            const workspaceMembers = [
                ...dbMembers.map(m => ({
                    userId: m.userId,
                    role: mapToWorkspaceRole(m.role) as WorkspaceRole
                })),
                {
                    userId: application.coordinatorId,
                    role: WorkspaceRole.COORDINATOR
                }
            ];
            const group = await groupService.getGroupByFilter(tx, {
                applicationId: application.id
            });
            if (group === null) { // just for safety, this should not happen as group is created at verification step
                throw new ApiError(500, "Group not found for approved application This should not happen as group is created at verification step");
            }

            await workspaceService.createWorkspaceTx(
                tx,
                {
                    groupId: group.id,
                    projectId: application.projectId,
                    coordinatorId: application.coordinatorId,
                },
                workspaceMembers
            );

            return group;
        });
    },

    async handleVerify(application: ApprovedApplication) {
        const { id: applicationId, projectId, coordinatorId } = application;
        const dbMembers = await applicationRepository.getApplicationMembers(prisma, {
            applicationId
        });
        const group = await groupService.createGroupTx(prisma, {
            projectId,
            coordinatorId,
            applicationId,
            members: dbMembers
        });
        return group;
    },
    async getCoordinatorApplications(coordinatorId: string) {
        return await applicationRepository.getCoordinatorApplications(coordinatorId);
    }
}