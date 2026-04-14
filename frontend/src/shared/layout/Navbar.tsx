import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "../../features/users/hooks/useUserProfile";
import ProfileDropdown from "../../features/users/components/ProfileDropdown";
import { useAuth } from "../../features/auth/hooks/useAuth"; // ✅ IMPORT THIS

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isLoading } = useUserProfile();
  const { logout } = useAuth(); // ✅ USE CENTRAL LOGOUT

  const [open, setOpen] = useState(false);

  // ⛔ Prevent render until user loads
  if (isLoading || !user) return null;

  const role = user.role.toLowerCase();
  const basePath = `/${role}`;

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "text-green-500"
      : "text-gray-400";
  };

  return (
    <div className="h-16 bg-[#0B0F19] border-b border-gray-800 flex items-center justify-between px-6 relative">

      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1
          className="text-white font-semibold text-lg cursor-pointer"
          onClick={() => navigate(`${basePath}/dashboard`)}
        >
          Project Portal
        </h1>

        <nav className="flex gap-4 cursor-pointer">
          <span
            onClick={() => navigate(`${basePath}/dashboard`)}
            className={isActive(`${basePath}/dashboard`)}
          >
            Dashboard
          </span>

          <span
            onClick={() => navigate(`${basePath}/projects`)}
            className={isActive(`${basePath}/projects`)}
          >
            Projects
          </span>

          <span
            onClick={() => navigate(`${basePath}/my-projects`)}
            className={isActive(`${basePath}/my-projects`)}
          >
            My Projects
          </span>

          {/* Coordinator */}
          {(user.role === "COORDINATOR" || user.role === "ADMIN") &&(
            <span
              onClick={() => navigate(`${basePath}/approvals`)}
              className={isActive(`${basePath}/approvals`)}
            >
              Approvals
            </span>
          )}

          {/* Admin */}
          {user.role === "ADMIN" && (
            <span
              onClick={() => navigate(`${basePath}/enrollment`)}
              className={isActive(`${basePath}/enrollment`)}
            >
              Enrollment
            </span>
          )}
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">
        
        {/* Notification */}
        <span className="cursor-pointer">🔔</span>

        {/* Role Badge */}
        <span className="bg-green-600 text-black px-3 py-1 rounded text-sm font-medium">
          {user.role}
        </span>

        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-black font-semibold cursor-pointer"
        >
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* Dropdown */}
        {open && (
          <ProfileDropdown
            user={{
              fullName: user.name,
              email: user.email,
            }}
            onLogout={logout} // ✅ CLEAN
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;