import { ApplicationStatus } from "@prisma/client"
import { z } from "zod"

/*
Create application (Leader)
*/

export const createApplicationSchema = z.object({
  projectId: z.string().uuid(),
  coordinatorId : z.string().uuid(),
  members: z
    .array(
      z.object({
        userId: z.string().uuid(),
        role: z.literal("MEMBER")
      })
    )
    .max(7, "Maximum 7 members allowed")
})


/*
update application DTO
*/
export const UpdateApplicationDTO=z.object( {
  leaderId: z.string().uuid(),
  projectId: z.string().uuid(),
  coordinatorId: z.string().uuid(),
}).partial();



/*
Params validation
*/

export const applicationIdParamSchema = z.object({
  applicationId: z.string().uuid()
})

/*
Query validation
*/

export const applicationQuerySchema = z.object({
  status: z
    .enum([
      "PENDING_COORDINATOR",
      "PENDING_ADMIN",
      "APPROVED",
      "REJECTED",
      "CANCELLED"
    ])
    .optional()
})