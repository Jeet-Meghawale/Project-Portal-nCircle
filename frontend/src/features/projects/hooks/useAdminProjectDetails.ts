import { useQuery } from "@tanstack/react-query";
import {projectService} from "../api/projectService"

export const useAdminProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: () => projectService.getAdminProjectById(projectId),
    enabled: !!projectId,
  });
};