import apiClient from "../../../shared/lib/apiClient";

export const coordinatorService = {
  // Dashboard
  async getProjects() {
    const res = await apiClient.get("/project/list");
    return res.data.data;
  },

  // My Projects
  async getMyProjects() {
    const res = await apiClient.get("/coordinator/my-projects");
    return res.data.data;
  },
};