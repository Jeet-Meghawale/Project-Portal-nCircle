import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthContext } from "../providers/AuthProvider";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;