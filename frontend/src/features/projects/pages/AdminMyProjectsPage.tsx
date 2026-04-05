import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../api/projectService";
import ProjectCard from "../../../shared/components/ProjectCard";

const AdminMyProjectsPage = () => {
    const navigate = useNavigate();

    const { data: projects, isLoading, isError } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: projectService.getAllProjects,
    });

    if (isLoading) {
        return <p className="text-white p-6">Loading projects...</p>;
    }

    if (isError) {
        return <p className="text-red-500 p-6">Failed to load projects</p>;
    }

    return (
        <div className="p-6 text-white">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">My Projects</h1>
                    <p className="text-gray-400">
                        Projects assigned to you
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/create-project")}
                    className="btn-primary"
                >
                    + Create Problem Statement
                </button>
            </div>

            {/* Empty state */}

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.isArray(projects) && projects.length > 0 ? (
                    projects.map((project: any) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            description={project.description}
                            status={project.isActive ? "Open" : "Closed"}
                            company="TechCorp"
                            tags={[]}
                            onClick={() => navigate(`/admin/my-projects/${project.id}`)}
                        />
                    ))
                ) : (
                    <p className="text-gray-400">No projects found</p>
                )}
            </div>
        </div>
    );
};

export default AdminMyProjectsPage;