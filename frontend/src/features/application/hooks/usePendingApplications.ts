import { useQuery } from "@tanstack/react-query";
import { applicationService } from "../../application/api/applicationService";

export const usePendingApplications = () => {
  return useQuery({
    queryKey: ["coordinator-applications"],
    queryFn: applicationService.getCoordinatorApplications,
  });
};