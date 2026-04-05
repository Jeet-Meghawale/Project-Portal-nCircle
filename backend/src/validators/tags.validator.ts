import {z} from "zod"

export const createTagSchema = z.object({
    name: z.string().min(1).max(50)
})

const tagNameParamSchema = z.object({
    name: z.string().min(1).max(50)
})