import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../projects/api/projectService";

export const useAdminDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: projectService.getAllProjects,
  });

  const projects = data || [];

  const totalProjects = projects.length;

  const openProjects = projects.filter(
    (p: any) => p.status === "Open"
  ).length;

  return {
    projects,
    totalProjects,
    openProjects,
    pendingApprovals: 0,
    isLoading,
    isError,
  };
};