import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserTable from "../components/UserTable";
import StatCard from "../components/StatsCard";
const EnrollmentDashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const { data, isLoading } = useUsers(search, role);

  const users = data?.users || [];

  const studentCount = users.filter(u => u.role === "STUDENT").length;
  const coordCount = users.filter(u => u.role === "COORDINATOR").length;
  const adminCount = users.filter(u => u.role === "ADMIN").length;

  return (
    <div className="min-h-screen p-6 bg-[#0B0F19] text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Enrollment Management</h1>
          <p className="text-gray-400 mt-1">
            Manage students, faculty, and industry persons
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-user")}
          className="bg-green-500 hover:bg-green-400 transition px-5 py-2 rounded-lg font-medium shadow-md"
        >
          + Add User
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <StatCard title="Students" value={studentCount} color="green" />
        <StatCard title="Faculty" value={coordCount} color="blue" />
        <StatCard title="Industry" value={adminCount} color="purple" />

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search by name or email..."
          className="flex-1 bg-[#111827] border border-gray-700 rounded-lg px-4 py-2 focus:border-green-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-[#111827] border border-gray-700 rounded-lg px-4 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All</option>
          <option value="STUDENT">Students</option>
          <option value="COORDINATOR">Faculty</option>
          <option value="ADMIN">Industry</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden shadow-md">

        {isLoading ? (
          <div className="p-6 text-center text-gray-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-400 mb-2">No users found</p>
            <button
              onClick={() => navigate("/admin/add-user")}
              className="text-green-400 hover:underline"
            >
              Add your first user
            </button>
          </div>
        ) : (
          <UserTable users={users} />
        )}
      </div>
    </div>
  );
};

export default EnrollmentDashboard;