import apiClient from "../../../shared/lib/apiClient";
import { LoginRequest, AuthResponse, User } from "../types/authTypes";

const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};

export default authService;