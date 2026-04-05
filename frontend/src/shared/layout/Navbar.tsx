import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "../../features/users/hooks/useUserProfile";
import ProfileDropdown from "../../features/users/components/ProfileDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useUserProfile();

  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-green-500"
      : "text-gray-400";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-[#0B0F19] border-b border-gray-800 flex items-center justify-between px-6 relative">
      
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1
          className="text-white font-semibold text-lg cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          Project Portal
        </h1>

        <nav className="flex gap-4 cursor-pointer">
          <span onClick={() => navigate("/admin/dashboard")} className={isActive("/admin/dashboard")}>Dashboard</span>
          <span onClick={() => navigate("/projects")} className="text-gray-400">Projects</span>
          <span onClick={() => navigate("/admin/my-projects")} className={isActive("/admin/my-projects")}>My Projects</span>
          <span className="text-gray-400">Approvals</span>
          <span onClick={() => navigate("/admin/enrollment")} className={isActive("/admin/enrollment")}>Enrollment</span>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">
        
        <span>🔔</span>

        <span className="bg-green-600 text-black px-3 py-1 rounded">
          {user?.role}
        </span>

        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-black font-semibold cursor-pointer"
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        {open && user && (
          <ProfileDropdown
            user={{
              fullName: user.name,
              email: user.email,
            }}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;