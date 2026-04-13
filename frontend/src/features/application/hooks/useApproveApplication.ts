import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../../application/api/applicationService";

export const useApproveApplication = () => {
  const queryClient = useQueryClient();

  // 🔹 Coordinator → verify
  const verifyMutation = useMutation({
    mutationFn: (applicationId: string) =>
      applicationService.verifyApplication(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coordinator-applications"],
      });
    },
  });

  // 🔹 Admin → final approve
  const approveMutation = useMutation({
    mutationFn: (applicationId: string) =>
      applicationService.approveApplication(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-applications"],
      });
    },
  });

  // 🔹 Reject (common)
  const rejectMutation = useMutation({
    mutationFn: (applicationId: string) =>
      applicationService.rejectApplication(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coordinator-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-applications"],
      });
    },
  });

  return {
    verify: verifyMutation.mutate,   // coordinator
    approve: approveMutation.mutate, // admin
    reject: rejectMutation.mutate,

    isVerifying: verifyMutation.isPending,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};