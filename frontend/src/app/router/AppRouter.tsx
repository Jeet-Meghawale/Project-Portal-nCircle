import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import RoleBasedRoute from "./RoleBasedRoute";

import StudentDashboard from "../../features/student/pages/studentDashboard";
import CoordinatorDashboard from "../../features/coordinator/pages/CoordinatorDashboard";
import AdminDashboard from "../../features/workspace/pages/adminDashboard";
import ApplicationDashboard from "../../features/application/pages/CoordinatorApplicationDashboard";

import DashboardLayout from "../../shared/layout/DashboardLayout";

import ProjectDetailsPage from "../../features/projects/pages/ProjectDetailsPage";

import CreateProjectPage from "../../features/workspace/pages/CreateProject";
import EnrollmentDashboard from "../../features/users/pages/EnrollmentDashboard";
import AddUserPage from "../../features/users/pages/AddUserPage";
import ProfilePage from "../../features/users/pages/ProfilePage";

// 🔥 IMPORT MISSING PAGES
import AdminMyProjectsPage from "../../features/projects/pages/AdminMyProjectsPage";
import AdminProjectDetailsPage from "../../features/projects/pages/AdminProjectDetailsPage";
import AdminApplicationDashboard from "../../features/application/pages/AdminApplicationDashboard";

function AppRouter() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />



      {/* 🔥 Common LAYOUT */}
      <Route element={<DashboardLayout />}>
        {/* COORDINATOR */}
        <Route
          path="/coordinator/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["COORDINATOR"]}>
              <CoordinatorDashboard />
            </RoleBasedRoute>
          }
        />
        {/* Coordinator project details page */}
        <Route
          path="/coordinator/projects/:projectId"
          element={
            <RoleBasedRoute allowedRoles={["COORDINATOR"]}>
              <ProjectDetailsPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/coordinator/approvals"
          element={
            <RoleBasedRoute allowedRoles={["COORDINATOR"]}>
              <ApplicationDashboard />
            </RoleBasedRoute>
          }
        />
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
        {/* ADMIN PROJECT DETAILS */}
        <Route
          path="/admin/projects/:projectId"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <ProjectDetailsPage />
            </RoleBasedRoute>
          }
        />
        {/*Workspace side of Admin */}
        <Route
          path="/admin/workspace/:projectId"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminProjectDetailsPage />
            </RoleBasedRoute>
          } />

        {/*Approvals side by Admin */}
        <Route
          path="/admin/approvals"
          element={
            <RoleBasedRoute allowedRoles={["ADMIN"]}>
              <AdminApplicationDashboard />
            </RoleBasedRoute>
          }
        />
        {/* Enrollment*/}
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