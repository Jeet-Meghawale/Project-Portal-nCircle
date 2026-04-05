import { ArrowLeft, Paperclip, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectDetailsPage = () => {
  const navigate = useNavigate();

  // 🔥 Static data (until backend supports)
  const skills = ["Python", "NLP", "Machine Learning", "React", "Node.js"];
  const deliverables = [
    "Functional chatbot prototype",
    "Integration documentation",
    "User manual",
    "Source code",
  ];
  const mentors = ["Dr. Sarah Johnson", "Prof. Michael Chen"];
  const attachments = ["Project_Requirements.pdf", "API_Documentation.pdf"];

  return (
    <div className="p-6 text-white max-w-7xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 mb-4"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-semibold">
          AI-Powered Customer Service Chatbot
        </h1>
        <span className="bg-green-600 text-black text-xs px-3 py-1 rounded-full">
          Open
        </span>
      </div>

      <p className="text-gray-400 mb-6">TechCorp Solutions</p>

      {/* Layout */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          {/* Description */}
          <div className="card">
            <h3 className="font-semibold mb-3">Project Description</h3>
            <p className="text-gray-400 text-sm">
              Develop a comprehensive AI-powered chatbot system that can handle
              customer inquiries, provide product information, and escalate
              complex issues to human agents. The system should integrate with
              existing CRM platforms and provide analytics on customer
              interactions.
            </p>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 className="font-semibold mb-3">Required Skills</h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-gray-700 px-2 py-1 rounded-md text-xs text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="card">
            <h3 className="font-semibold mb-3">Expected Deliverables</h3>

            <div className="space-y-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-gray-400 text-sm"
                >
                  <CheckCircle size={16} className="text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* Project Info */}
          <div className="card">
            <h3 className="font-semibold mb-4">Project Info</h3>

            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Industry Person</span>
              <span className="text-white">John Smith</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mb-3">
              <span>Groups Applied</span>
              <span className="text-white">1 / 3</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Attachments</span>
              <span className="text-white">2</span>
            </div>
          </div>

          {/* Mentors */}
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users size={16} />
              Available Mentors
            </h3>

            <div className="space-y-3">
              {mentors.map((mentor) => (
                <div
                  key={mentor}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs">
                    M
                  </div>
                  {mentor}
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Paperclip size={16} />
              Attachments
            </h3>

            <div className="space-y-2">
              {attachments.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 text-green-500 text-sm cursor-pointer"
                >
                  <Paperclip size={14} />
                  {file}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;