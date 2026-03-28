import { z } from "zod"


export const createReviewSchema = z.object({
    title : z.string(),
    description : z.string().optional(),
    progress : z.int().optional(),
    workspaceId : z.string().uuid()
});

export const reviewIdParamSchemaa = z.object({
    reviewId : z.string().optional(),
});

export const getReviewByFilterSchema = z.object({
    title : z.string(),
    description : z.string(),
    progress : z.int(),
    workspaceId : z.string().uuid()
}).partial();

export const updateReviewSchema = z.object({
    title : z.string(),
    description : z.string(),
    progress : z.int(),
    workspaceId : z.string().uuid()
}).partial();
