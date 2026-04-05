import { useQuery } from "@tanstack/react-query";
import { studentService } from "../api/studentService";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  techStack?: string[];
  students?: { id: string }[];
}

interface Task {
  id: string;
  status: string;
}

export const useStudentDashboard = (studentId?: string) => {
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: studentService.getProjects,
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["student-tasks", studentId],
    queryFn: () => studentService.getStudentTasks(studentId!),
    enabled: !!studentId,
  });

  const totalProjects = projects.length;

  const openProjects = projects.filter(
    (p: Project) => p.status === "OPEN"
  ).length;

  const myProjects = projects.filter((project: Project) =>
    project.students?.some((s) => s.id === studentId)
  );

  const completedTasks = tasks.filter(
    (t: Task) => t.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (t: Task) => t.status !== "COMPLETED"
  ).length;

  return {
    projects,
    myProjects,
    totalProjects,
    openProjects,
    completedTasks,
    pendingTasks,
    isLoading: projectsLoading || tasksLoading,
  };
};