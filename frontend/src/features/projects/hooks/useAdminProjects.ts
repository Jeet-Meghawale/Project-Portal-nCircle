import { useQuery } from "@tanstack/react-query";
import { projectService } from "../api/projectService";

export const useMyProjects = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-my-projects"],
    queryFn: projectService.getAllProjects,
  });

  return {
    projects: data,
    isLoading,
  };
};