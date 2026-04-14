import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthContext } from "../providers/AuthProvider";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleBasedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuthContext();

  // ⏳ Wait until auth check completes
//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log(user.role)
  // ❌ Wrong role
  if (!allowedRoles.includes(user.role)) {
    // redirect to correct dashboard
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.role === "coordinator") return <Navigate to="/coordinator/dashboard" />;
    if (user.role === "STUDENT") return <Navigate to="/student/dashboard" replace />;
  }

  // ✅ Allowed
  return <>{children}</>;
};

export default RoleBasedRoute;