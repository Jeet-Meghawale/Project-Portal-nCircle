import {TypeOf, z} from "zod"
import {addWorkspaceMemberSchema, createWorkspaceSchema, updateWorkspaceMemberSchema, updateWorkspaceSchema} from "../../validators/workspace.validator"

export type updateWorkspaceDTO = z.infer<typeof updateWorkspaceSchema>

export type createWorkspaceDTO =z.infer<typeof createWorkspaceSchema>

export type addWorkspaceMemberDTO = z.infer<typeof addWorkspaceMemberSchema>

export type updateWorkspaceMemberDTO = z.infer<typeof updateWorkspaceMemberSchema>


