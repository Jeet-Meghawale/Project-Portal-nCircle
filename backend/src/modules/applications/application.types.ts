import { ApplicationMember, ApplicationStatus, MemberRole } from "@prisma/client"
import { string } from "zod"

/*
Create Application
Leader applies to a project
*/

export interface CreateApplicationDTO {
  projectId: string
  coordinatorId: string

  members: {
    userId: string
    role: MemberRole
  }[]
}
/* 
create app repo */
export interface CreateApplicationOnly{
  leaderId:string
  projectId: string
  coordinatorId: string
}

/*
Cancel Application
*/

export interface CancelApplicationDTO {
  status: ApplicationStatus
}

/*
Query filters for listing applications
*/

export interface ApplicationQueryDTO {
  status?: ApplicationStatus
}

/*
Service input when creating application
*/

export interface CreateApplicationServiceInput {
  leaderId: string
  projectId: string
  coordinatorId: string
  members: {
    userId: string
    role: MemberRole
  }[]
}

/*
service input while Updating Application
*/
export interface UpdateApplicationServiceInput {
  leaderId?: string
  projectId?: string
  coordinatorId?: string
  status?: ApplicationStatus
}

/*
update application DTO
*/
export interface UpdateApplicationDTO {
  leaderId?: string
  projectId?: string
  coordinatorId?: string
}



/*
Application Member Input
*/

export interface ApplicationMemberInput {
  userId: string
  role: MemberRole
}

export type ApprovedApplication = {
  id: string,
  projectId: string,
  coordinatorId: string,
  leaderId: string,
  status: ApplicationStatus,
  createdAt: Date,
  updatedAt: Date,
  members: ApplicationMember[]
}