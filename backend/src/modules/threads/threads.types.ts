import {z} from "zod"
import { createThreadSchema, updateThreadSchema } from "../../validators/threads.validator"


export type createThreadInput = z.infer<typeof createThreadSchema>

export type updateThreadInput = z.infer<typeof updateThreadSchema>