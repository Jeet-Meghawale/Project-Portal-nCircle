import apiClient from "../../../shared/lib/apiClient";

export const projectService = {
  getAllProjects: async () => {
    const res = await apiClient.get("/project/list-admin");
    return res.data.data;
  },
  createProjects: async (data: any) => {
    const res = await apiClient.post("/project/create", data);
    return res.data;
  },
  getAdminProjectById : async (projectId: string) => {
    const res = await apiClient.get(`/project/admin/${projectId}`);
    console.log("Admin Project Details Response:", res.data.data);
    return res.data.data;
  },
  getProjectById: async (projectId: string) => {
    const res = await apiClient.get(`/project/${projectId}`);
    return res.data.data;
  },
};