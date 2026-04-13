import { useQuery } from "@tanstack/react-query";
import { applicationService } from "../api/applicationService";

export const useAdminApplications = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: applicationService.getAdminApplications,
  });

  const sorted = [...data].sort((a: any, b: any) => {
    if (a.status === "PENDING_ADMIN") return -1;
    if (b.status === "PENDING_ADMIN") return 1;
    return 0;
  });

  return {
    applications: sorted,
    isLoading,
  };
};