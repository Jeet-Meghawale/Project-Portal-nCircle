import { useNavigate } from "react-router-dom";
import StatsCard from "../../../shared/components/StatsCard";
import ProjectCard from "../../../shared/components/ProjectCard";
import SearchBar from "../../../shared/components/SearchBar";
import FilterDropdown from "../../../shared/components/FilterDropdown";
import { useCoordinatorDashboard } from "../hooks/useCoordinatorDashboard";
import { useAuth } from "../../../shared/hooks/useAuth";

const CoordinatorDashboard = () => {
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useAuth();

  const {
    projects,
    totalProjects,
    openProjects,
    isLoading,
  } = useCoordinatorDashboard();

  if (userLoading || isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-400">
          Manage and review project applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Projects" value={totalProjects} />
        <StatsCard title="Open Projects" value={openProjects} />
        <StatsCard title="Assigned Projects" value={projects.length} />
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4">
        <SearchBar />
        <FilterDropdown />
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard
            key={project.id}
            {...project}
            onClick={() =>
              navigate(`/coordinator/projects/${project.id}`)
            }
            actions={
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/coordinator/projects/${project.id}`);
                  }}
                  className="flex-1 border border-gray-700 rounded px-3 py-2 text-sm hover:bg-gray-800"
                >
                  View Details
                </button>
              </div>
            }
          />
        ))}
      </div>

    </div>
  );
};

export default CoordinatorDashboard;