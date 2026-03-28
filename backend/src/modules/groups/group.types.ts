import { MemberRole } from "@prisma/client"
import { z } from "zod"
import { groupIdParamsSchema } from "../../validators/group.validator"

export interface createGroupDTO{
  projectId :String,
  applicationId :String,
  coordinatorId :String,
  members: {
      userId: string
      role: MemberRole
    }[]
}

export interface updateGroupDTO{
  projectId? :String,
  applicationId? :String,
  coordinatorId? :String
}

export type groupId = z.infer<typeof groupIdParamsSchema>