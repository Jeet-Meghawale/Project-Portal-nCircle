import { useQuery } from "@tanstack/react-query";
import { coordinatorService } from "../api/coordinatorService";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  techStack?: string[];
}

export const useCoordinatorDashboard = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["coordinator-projects"],
    queryFn: coordinatorService.getProjects,
  });

  const totalProjects = projects.length;

  const openProjects = projects.filter(
    (p: Project) => p.status === "OPEN"
  ).length;

  return {
    projects,           // ✅ IMPORTANT
    totalProjects,
    openProjects,
    isLoading,
  };
};