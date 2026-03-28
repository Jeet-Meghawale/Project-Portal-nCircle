import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  visibility: z.enum(["LISTED", "UNLISTED"])
});

export const updateProjectSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  visibility: z.enum(["LISTED", "UNLISTED"]).optional(),
  isActive: z.boolean().optional()
});



export const ProjectIdParamSchema = z.object({
  projectId: z.string().uuid()
})