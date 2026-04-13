import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/taskService";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};