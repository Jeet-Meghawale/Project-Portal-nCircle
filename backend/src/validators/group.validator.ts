import { z } from "zod"

export const createGroupSchema = z.object({
    projectId: z.string().uuid(),
    coordinatorId: z.string().uuid(),
    members: z
        .array(
            z.object({
                userId: z.string().uuid(),
                role: z.literal("MEMBER","LEADER")
            })
        )
        .max(7, "Maximum 7 members allowed")
})

export const updateGroupSchema = z.object({
    projectId: z.string().uuid(),
    coordinatorId: z.string().uuid(),
    applicationId: z.string().uuid(),
})

export const groupIdParamsSchema = z.object({
    groupId : z.string().uuid(),
});