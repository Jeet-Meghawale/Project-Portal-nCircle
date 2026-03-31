import { z } from 'zod';

export const fileIdParamSchema = z.object({
    fileId: z.string().uuid()
})