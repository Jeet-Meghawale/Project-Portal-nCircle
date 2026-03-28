import { WorkspaceRole } from "@prisma/client"
import { isAbsolute } from "node:path";
import { z } from "zod"

export const createWorkspaceSchema = z.object({
    groupId: z.string().uuid(),
    projectId: z.string().uuid(),
    members: z.array(
        z.object({
            userId: z.string().uuid(),
            role: z.nativeEnum(WorkspaceRole)
        })
    )
});

export const updateWorkspaceSchema = z.object({
    groupId: z.string().uuid(),
    projectId: z.string().uuid(),
    isActive : z.boolean(),
}).partial();

export const addWorkspaceMemberSchema = z.object({
    workspaceId: z.string().uuid(),
    userId: z.string().uuid(),
    role: z.nativeEnum(WorkspaceRole),
})

export const updateWorkspaceMemberSchema = z.object({
    workspaceId: z.string().uuid(),
    userId: z.string().uuid(),
    role: z.nativeEnum(WorkspaceRole),
    isActive : z.boolean(),
}).partial();

export const workspaceIdParamsSchema = z.object({
    workspaceId : z.string().uuid()
});