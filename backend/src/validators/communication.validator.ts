import {z} from "zod";

export const createCommunicationInputSchema = z.object({
    threadId: z.string().uuid(),
    message: z.string().max(1000),
});

export const communicationIdParamSchema = z.object({
    communicationId: z.string().uuid()
});

export const workspaceCommunicationInputSchema = z.object({
    workspaceId: z.string().uuid(),
    message: z.string().max(1000),
});