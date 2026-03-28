import { z } from "zod"
import { Role } from "@prisma/client"

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    mobile: z.string().min(10, "Invalid mobile number").optional(),

    role: z.nativeEnum(Role).optional(),

    college: z.string().optional(),
    branch: z.string().optional(),
    graduationYear: z.number().int().optional(),
  })
  .refine(
    (data) => {
      if (data.role === Role.STUDENT || !data.role) {
        return (
          data.college &&
          data.branch &&
          data.graduationYear &&
          data.mobile
        )
      }
      return true
    },
    {
      message:
        "College, branch, graduationYear and mobile are required for students",
      path: ["college"],
    }
  )

export type RegisterInput = z.infer<typeof registerSchema>


export const userIdParamSchema = z.object({
  userId: z.string().uuid()
})