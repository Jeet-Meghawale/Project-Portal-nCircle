import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-[#0B0F19] min-h-screen">
      <Navbar />

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;