import { MemberRole } from "@prisma/client"
import { z } from "zod"
import { groupIdParamsSchema } from "../../validators/group.validator"

export interface createGroupDTO{
  projectId :string,
  applicationId :string,
  coordinatorId :string,
  members: {
      userId: string
      role: MemberRole
    }[]
}

export interface updateGroupDTO{
  projectId? :string,
  applicationId? :string,
  coordinatorId? :string
}
export interface createGroupDTONoMembers{
  projectId :string,
  applicationId :string,
  coordinatorId :string
}

export type groupId = z.infer<typeof groupIdParamsSchema>