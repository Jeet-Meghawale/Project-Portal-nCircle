import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/userService";

export const useUsers = (search?: string, role?: string) => {
  return useQuery({
    queryKey: ["users", search, role],
    queryFn: () => userService.getUsers(search, role),
  });
};