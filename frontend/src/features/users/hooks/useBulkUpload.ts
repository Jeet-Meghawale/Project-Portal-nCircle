import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/userService";

export const useBulkUpload = () => {
  return useMutation({
    mutationFn: (users: any[]) => userService.registerBulk(users),
  });
};