import { usePendingApplications } from "./usePendingApplications";

export const useApplicationDashboard = () => {
  const { data, isLoading, error } = usePendingApplications();

  return {
    applications: data || [],
    isLoading,
    error,
  };
};