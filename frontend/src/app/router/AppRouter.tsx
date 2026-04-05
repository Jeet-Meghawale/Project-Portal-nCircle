import { Routes, Route } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import RoleBasedRoute from "./RoleBasedRoute";

import StudentDashboard from "../../features/student/pages/studentDashboard";
import CoordinatorDashboard from "../../features/workspace/pages/coordinatorDashboard";
import AdminDashboard from "../../features/workspace/pages/adminDashboard";

import DashboardLayout from "../../shared/layout/DashboardLayout";

import ProjectDetailsPage from "../../features/projects/pages/ProjectDetailsPage"; 

import CreateProjectPage from "../../features/workspace/pages/CreateProject";
import EnrollmentDashboard from "../../features/users/pages/EnrollmentDashboard";
import AddUserPage from "../../features/users/pages/AddUserPage";
import ProfilePage from "../../features/users/pages/ProfilePage";

// 🔥 IMPORT MISSING PAGES
import AdminMyProjectsPage from "../../features/projects/pages/AdminMyProjectsPage";
import AdminProjectDetailsPage from "../../features/projects/pages/AdminProjectDetailsPage";

function AppRouter() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />


      {/* COORDINATOR */}
      <Route
        path="/coordinator/dashboard"
        element={
          <RoleBasedRoute allowedRoles={["COORDINATOR"]}>
            <CoordinatorDashboard />
          </RoleBasedRoute>
        }
      />

      {/* 🔥 ADMIN LAYOUT */}
      <Route element={<DashboardLayout />}>

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </RoleBasedRoute>
          }
        />
        {/* PROJECT DETAILS */}
        <Route
          path="/student/projects/:projectId"
          element={
            <RoleBasedRoute allowedRoles={["STUDENT"]}>
              <ProjectDetailsPage />
            </RoleBasedRoute>
        }
        />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* 🔥 ADD THIS HERE */}
        <Route
          path="/admin/enrollment"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <EnrollmentDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/admin/add-user"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AddUserPage />
            </RoleBasedRoute>
          }
        />

        <Route path="/profile" element={<ProfilePage />} />

        {/* CREATE PROJECT */}
        <Route
          path="/admin/create-project"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <CreateProjectPage />
            </RoleBasedRoute>
          }
        />

        {/* MY PROJECTS */}
        <Route
          path="/admin/my-projects"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminMyProjectsPage />
            </RoleBasedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

export default AppRouter;