import apiClient from "../../../shared/lib/apiClient";

export const studentService = {
  async getProjects() {
    const res = await apiClient.get("/project/list");
    return res.data.data;
  },

  async getStudentTasks(studentId: string) {
    const res = await apiClient.get(`/task/student/${studentId}`);
    return res.data.data;
  },
};