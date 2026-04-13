import { useState } from "react";
import ApplyProjectModal from "../../application/components/ApplyProjectModal";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectDetails } from "../hooks/useProjectDetailsPage";
import {
  Building2,
  // CheckCircle,
  Users,
  Paperclip,
  Download,
  ArrowLeft,
} from "lucide-react";


const ProjectDetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading } = useProjectDetails(projectId);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!project) return <div className="p-6">Project not found</div>;

  return (
    <div className="space-y-6">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              {project.title}
            </h1>

            <span className="bg-green-600 text-black text-xs px-2 py-1 rounded">
              {project.status}
            </span>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 text-gray-400 mt-2">
            <Building2 size={14} />
            {project.company}
          </div>
        </div>

        {/* Apply Button */}
        {project.isActive && user?.role === "STUDENT" && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-green-600 text-black px-4 py-2 rounded-md hover:bg-green-500"
          >
            Apply for Project
          </button>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Description */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">Project Description</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">Required Skills</h2>

            <div className="flex flex-wrap gap-2">
              {/* {project.techStack?.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs border border-gray-700 px-2 py-1 rounded-md text-gray-300"
                >
                  {tech}
                </span>
              ))} */}
              <h1>tech stack coming soon</h1>
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-3">Expected Deliverables</h2>

            <ul className="space-y-2 text-sm text-gray-400">
              {/* {project.deliverables?.map((item: string) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  {item}
                </li>
              ))} */}
              <h1>deliverables coming soon</h1>
            </ul>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Project Info */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold">Project Info</h2>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Industry Person</span>
              <span className="text-white">{project.createdByName}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Groups Applied</span>
              <span className="text-white">{project.groupsApplied}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Attachments</span>
              <span className="text-white">{project.attachments?.length}</span>
            </div>
          </div>

          {/* Mentors */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Users size={16} />
              Available Mentors
            </h2>

            {project.mentors?.map((mentor: any) => (
              <div key={mentor.id} className="text-sm text-gray-300">
                {mentor.name}
              </div>
            ))}
          </div>

          {/* Attachments */}
          <div className="bg-[#0B0F1A] border border-gray-800 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Paperclip size={16} />
              Attachments
            </h2>

            {project.attachments?.map((file: any) => (
              <div
                key={file.id}
                className="flex items-center justify-between text-sm text-gray-300"
              >
                {file.name}

                <button className="text-green-500 hover:text-green-400">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
      <ApplyProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        project={project}
        user={user}
      />
    </div>
  );
};

export default ProjectDetailsPage;