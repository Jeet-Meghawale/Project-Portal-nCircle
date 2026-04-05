import apiClient from "../../../shared/lib/apiClient";

interface CreateApplicationPayload {
  projectId: string;
  coordinatorId: string;
  members: {
    userId: string;
    role: "MEMBER";
  }[];
}

export const applicationService = {
  createApplication: async (data: CreateApplicationPayload) => {
    const res = await apiClient.post("/applications/create", data);

    // ✅ consistent response handling
    return res.data.data;
  },

  // 🔥 (FOR FUTURE - My Applications Page)
  getMyApplications: async () => {
    const res = await apiClient.get("/applications/my");

    return res.data.data;
  },

  // 🔥 (FOR FUTURE - single application)
  getApplicationById: async (applicationId: string) => {
    const res = await apiClient.get(
      `/applications/${applicationId}`
    );

    return res.data.data;
  },
};