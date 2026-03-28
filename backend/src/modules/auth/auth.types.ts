import { Role } from "@prisma/client"

export interface RegisterUserInput {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: Role

  mobile?: string
  college?: string
  branch?: string
  graduationYear?: number
}