import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN" | "COORDINATOR";
}

const fetchMe = async (): Promise<AuthUser> => {
  const res = await apiClient.get("/auth/me");
  return res.data.data; // ✅ backend format
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
  });
};