import { useParams, useNavigate } from "react-router-dom";
import { useAdminProjectDetails } from "../hooks/useAdminProjectDetails";
import { useState } from "react";
import TaskList from "../components/TaskList";
import DashboardLayout from "../../../shared/layout/DashboardLayout";
import { ArrowLeft } from "lucide-react";

const AdminProjectWorkspacePage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useAdminProjectDetails(projectId!);

  const [activeTab, setActiveTab] = useState("tasks");

  if (isLoading) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-500">No project found</div>;
  }

  return (
      <div className="min-h-screen bg-[#0B0F19] text-white p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-start">

          {/* LEFT */}
          <div className="space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={16} />
              Back to My Projects
            </button>

            <h1 className="text-2xl font-semibold">
              {data.title}
            </h1>

            <p className="text-gray-400 max-w-2xl">
              {data.description}
            </p>
          </div>

          {/* RIGHT CTA */}
          <button className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-lg text-sm font-medium">
            + Create Task
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-800">
          {[
            { key: "tasks", label: "Tasks" },
            { key: "chat", label: "Group Chat" },
            { key: "team", label: "Team" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 text-sm transition ${
                activeTab === tab.key
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT CARD */}
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 min-h-[350px]">

          {/* TASKS */}
          {activeTab === "tasks" && (
            <TaskList projectId={projectId!} />
          )}

          {/* CHAT */}
          {activeTab === "chat" && (
            <div className="text-gray-400">
              Group chat coming soon...
            </div>
          )}

          {/* TEAM */}
          {activeTab === "team" && (
            <div className="space-y-4">

              {data.students?.length === 0 ? (
                <p className="text-gray-400">No team members yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.students.map((student: any) => (
                    <div
                      key={student.id}
                      className="bg-[#0B0F19] border border-gray-800 rounded-lg p-4"
                    >
                      <p className="font-medium">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {student.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
  );
};

export default AdminProjectWorkspacePage;