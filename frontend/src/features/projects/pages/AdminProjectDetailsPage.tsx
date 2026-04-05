import { useParams } from "react-router-dom";
import { useAdminProjectDetails } from "../hooks/useAdminProjectDetails";
import { useState } from "react";
import TaskList from "../components/TaskList";

const AdminProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useAdminProjectDetails(projectId!);

  const [activeTab, setActiveTab] = useState("tasks");

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!data) return <p className="text-red-500">No project found</p>;

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button className="text-gray-400 mb-2">
            ← Back to My Projects
          </button>

          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="text-gray-400">{data.description}</p>
        </div>

        <button className="btn-primary">
          + Create Task
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("tasks")}>Tasks</button>
        <button onClick={() => setActiveTab("chat")}>Group Chat</button>
        <button onClick={() => setActiveTab("team")}>Team</button>
      </div>

      {/* CONTENT */}
      {activeTab === "tasks" && <TaskList projectId={projectId!} />}
    </div>
  );
};

export default AdminProjectDetailsPage;