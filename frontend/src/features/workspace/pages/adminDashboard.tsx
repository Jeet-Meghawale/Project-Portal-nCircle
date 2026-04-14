import StatsCard from "../../../shared/components/StatsCard";
import ProjectCard from "../../../shared/components/ProjectCard";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    projects,
    totalProjects,
    openProjects,
    pendingApprovals,
    isLoading,
    isError,
  } = useAdminDashboard();

  if (isLoading) return <div className="text-white p-6">Loading...</div>;
  if (isError) return <div className="text-red-500 p-6">Error loading data</div>;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading">Welcome back, Admin</h1>
          <p className="subtext">
            Manage projects and approve applications
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/admin/create-project")}
        >
          + Create Problem Statement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Projects" value={totalProjects} />
        <StatsCard title="Open Projects" value={openProjects} />
        <StatsCard title="Pending Approvals" value={pendingApprovals} />
        <StatsCard title="Your Role" value="Admin" />
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project: any) => (
            <ProjectCard
              key={project.id}
              {...project}
              onViewDetails={() =>
                navigate(`/admin/projects/${project.id}`)
              }
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;