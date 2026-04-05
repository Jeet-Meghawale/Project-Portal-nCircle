import { useState } from "react";
import AddUserForm from "../components/AddUserModal";
import BulkUploadSection from "../components/BulkUploadSection";

type TabType = "STUDENT" | "COORDINATOR" | "ADMIN" | "BULK";

const AddUserPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("STUDENT");

  return (
    <div className="min-h-screen p-6 text-white bg-[#0B0F19]">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-semibold">Add Users</h1>
        <p className="text-gray-400 mt-1">
          Create students, coordinators, admins or upload in bulk
        </p>
      </div>

      {/* TABS */}
      <div className="max-w-5xl mx-auto flex gap-3 mb-6 flex-wrap">
        {["STUDENT", "COORDINATOR", "ADMIN", "BULK"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-5 py-2 rounded-full text-sm transition-all
              ${
                activeTab === tab
                  ? "bg-green-500 text-black font-medium shadow-md"
                  : "bg-[#111827] border border-gray-700 hover:border-green-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT CARD */}
      <div className="max-w-5xl mx-auto bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-lg">

        {activeTab === "BULK" ? (
          <BulkUploadSection />
        ) : (
          <AddUserForm role={activeTab} />
        )}

      </div>
    </div>
  );
};

export default AddUserPage;