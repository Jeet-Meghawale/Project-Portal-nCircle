import { useQuery } from "@tanstack/react-query";
import { applicationService } from "../api/applicationService";

export const useCoordinators = () => {
  return useQuery({
    queryKey: ["coordinators"],
    queryFn: applicationService.getCoordinators,
  });
};