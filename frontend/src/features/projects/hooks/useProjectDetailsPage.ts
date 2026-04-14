import { useQuery } from "@tanstack/react-query";
import { projectService } from "../api/projectService";

export const useProjectDetails = (projectId?: string) => {
  return useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => projectService.getProjectById(projectId!),
    enabled: !!projectId,
  });
};