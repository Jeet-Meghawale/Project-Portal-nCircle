import { useQuery } from "@tanstack/react-query";
import { taskService } from "../api/taskService";

// 🔥 IMPORTANT: export keyword
export const useTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => taskService.getTasks(projectId),
  });
};