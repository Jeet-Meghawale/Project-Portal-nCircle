import apiClient from "../../../shared/lib/apiClient";

export const taskService = {
  getTasks: async (projectId: string) => {
    const res = await apiClient.get(`/task/project/${projectId}`);
    return res.data.data;
  },

  createTask: async (data: any) => {
    const res = await apiClient.post("/task/create", data);
    return res.data;
  },
};