import {z} from "zod"

export const createThreadSchema = z.object({
    workspaceId : z.string().uuid(),
    title : z.string().min(1).max(255),
    description : z.string().max(1000).optional(),
})

export const threadIdParamSchema = z.object({
    threadId : z.string().uuid()
})

export const updateThreadSchema = z.object({
    title : z.string().min(1).max(255).optional(),
    description : z.string().max(1000).optional(),
    workspaceId : z.string().uuid().optional(),
});