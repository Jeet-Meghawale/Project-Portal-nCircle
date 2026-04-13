import apiClient from "../../../shared/lib/apiClient";

export const applicationService = {
  // =========================================
  // 🔹 STUDENT
  // =========================================

  createApplication: async (data: {
    projectId: string;
    coordinatorId: string;
    members: { userId: string; role: "MEMBER" }[];
  }) => {
    const res = await apiClient.post("/application/create", data);
    return res.data.data;
  },

  // Verify member (email → userId)
  verifyUser: async (email: string) => {
    const res = await apiClient.post("/auth/verify-role", {
      email,
      role: "STUDENT",
    });

    return res.data.data; // { id, email, role }
  },

  getMyApplications: async () => {
    const res = await apiClient.get("/application/my");
    return res.data.data;
  },

  cancelApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/cancel/${applicationId}`);
    return res.data.data;
  },

  // =========================================
  // 🔹 COORDINATOR
  // =========================================


  getCoordinatorApplications: async () => {
    console.log("Fetching coordinator applications...");
    const res = await apiClient.get("/application/coordinator");
    console.log(res.data);
    return res.data.data;
  },

  // Move → PENDING_ADMIN
  verifyApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/verify/${applicationId}`);
    return res.data.data;
  },

  // =========================================
  // 🔹 ADMIN
  // =========================================

  // Fetch applications verified by coordinator
  getAdminApplications: async () => {
    const res = await apiClient.get("/application/admin");
    console.log("Admin applications:", res.data);
    return res.data.data;
  },

  // Final approval → creates group
  approveApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/approve/${applicationId}`);
    return res.data.data;
  },

  rejectApplication: async (applicationId: string) => {
    const res = await apiClient.patch(`/application/reject/${applicationId}`);
    return res.data.data;
  },

  // =========================================
  // 🔹 COMMON
  // =========================================

  getApplicationById: async (applicationId: string) => {
    const res = await apiClient.get(`/application/${applicationId}`);
    return res.data.data;
  },
};