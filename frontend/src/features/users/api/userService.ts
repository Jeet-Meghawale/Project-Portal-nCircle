import apiClient from "../../../shared/lib/apiClient";
import { RegisterUserInput, UsersResponse } from "../types/userTypes";

export const userService = {
    //Getting all users route remaining from backend
  getUsers: async (search?: string, role?: string): Promise<UsersResponse> => {
    const res = await apiClient.get("/users", {
      params: { search, role },
    });
    return res.data;
  },

  createUser: async (data: RegisterUserInput) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },
  registerBulk: async (users: any[]) => {
    const res = await apiClient.post("/auth/register/bulk", users);
    return res.data;
  },
  downloadCSV: async () => {
    const res = await apiClient.get("/users/export", {
      responseType: "blob",
    });
    return res.data;
  },
   getProfile: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data.data;
  },
};