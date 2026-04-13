import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../shared/layout/DashboardLayout";
import ProjectCard from "../../../shared/components/ProjectCard";
import { useMyProjects } from "../hooks/useAdminProjects";

const AdminMyProjectsPage = () => {
  const navigate = useNavigate();

  const { projects, isLoading } = useMyProjects() as {
    projects: any[];
    isLoading: boolean;
  };

  if (isLoading) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            My Projects
          </h1>
          <p className="text-gray-400">
            Manage and monitor your assigned projects
          </p>
        </div>

        {/* PROJECT GRID */}
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects assigned</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                status={project.isActive ? "Open" : "Closed"}
                company="TechCorp"
                tags={[]}

                // 🔥 CLICK CARD → workspace
                onClick={() =>
                  navigate(`/admin/workspace/${project.id}`)
                }

                // 🔥 CUSTOM ACTION BUTTON
                actions={
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/workspace/${project.id}`);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-black py-2 rounded-lg text-sm font-medium"
                  >
                    Open Workspace
                  </button>
                }
              />
            ))}

          </div>
        )}

      </div>
  );
};

export default AdminMyProjectsPage;