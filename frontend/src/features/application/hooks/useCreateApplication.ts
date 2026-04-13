import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../api/applicationService";

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationService.createApplication,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-details", variables.projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["student-dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },

    onError: (error: any) => {
      console.error("Application failed:", error?.response?.data || error);
    },
  });
};