import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../../application/api/applicationService";

export const useApproveApplication = () => {
  const queryClient = useQueryClient();

  const verifyMutation = useMutation({
    mutationFn: applicationService.verifyApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coordinator-applications"] });
    },
  });

  const approveMutation = useMutation({
    mutationFn: applicationService.approveApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: applicationService.rejectApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coordinator-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Reject failed");
    },
  });

  return {
    verify: verifyMutation.mutate,
    approve: approveMutation.mutate,
    reject: rejectMutation.mutate,

    isVerifying: verifyMutation.isPending,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};