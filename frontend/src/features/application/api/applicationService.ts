import apiClient from "../../../shared/lib/apiClient";

export const applicationService = {
  // ✅ CREATE APPLICATION
  createApplication: async (data: {
    projectId: string;
    coordinatorId: string;
    proposed_solution: string;
    members: { userId: string; role: "MEMBER" }[];
  }) => {
    const res = await apiClient.post("/application/create", data);
    return res.data.data;
  },

  // ✅ VERIFY USER (FIXED)
  verifyUser: async (email: string) => {
    const res = await apiClient.post("/auth/verify-role", {
      email,
      role: "STUDENT",
    });

    return res.data.data; // 🔥 returns { id, email, role }
  },

  // ✅ COORDINATOR APPLICATIONS
  getCoordinatorApplications: async () => {
    const res = await apiClient.get("/application/coordinator");
    return res.data.data;
  },

  getCoordinators: async () => {
    const res = await apiClient.get("/auth/coordinators");
    return res.data.data;
  },
  // ✅ VERIFY (COORDINATOR)
  verifyApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/verify/${applicationId}`);
    return res.data.data;
  },

  // ✅ ADMIN APPLICATIONS
  getAdminApplications: async () => {
    const res = await apiClient.get("/application/admin");
    return res.data.data;
  },

  // ✅ FINAL APPROVE
  approveApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/approve/${applicationId}`);
    return res.data.data;
  },

  // ✅ REJECT
  rejectApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/reject/${applicationId}`);
    return res.data.data;
  },
};