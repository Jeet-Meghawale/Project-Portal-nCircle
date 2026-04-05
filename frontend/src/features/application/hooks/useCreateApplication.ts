import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../api/applicationService";

interface CreateApplicationInput {
  projectId: string;
  coordinatorId: string;
  members: {
    userId: string;
    role: "MEMBER";
  }[];
}

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationInput) =>
      applicationService.createApplication(data),

    onSuccess: (data, variables) => {
      // ✅ Refetch project details (to update hasApplied, status)
      queryClient.invalidateQueries({
        queryKey: ["project-details", variables.projectId],
      });

      // ✅ Optional: refresh student dashboard
      queryClient.invalidateQueries({
        queryKey: ["student-dashboard"],
      });

      // ✅ Optional: future - applications list
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      console.log("Application created successfully");
    },

    onError: (error: any) => {
      console.error("Application failed:", error?.response?.data || error);
    },
  });
};