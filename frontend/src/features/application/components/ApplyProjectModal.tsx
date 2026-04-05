import { useState } from "react";
import { X } from "lucide-react";
import { useCreateApplication } from "../hooks/useCreateApplication";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  user: any;
}

const ApplyProjectModal = ({ isOpen, onClose, project, user }: Props) => {
  const { mutate, isPending } = useCreateApplication();

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<
    { email: string; verified: boolean }[]
  >([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ✅ Add member
  const handleAddMember = () => {
    if (!email) return;

    const lastMember = members[members.length - 1];

    if (lastMember && !lastMember.verified) {
      setError("Please verify previous member first");
      return;
    }

    if (members.find((m) => m.email === email)) {
      setError("Member already added");
      return;
    }

    if (members.length >= 6) {
      setError("Max 6 members allowed");
      return;
    }

    setMembers([...members, { email, verified: false }]);
    setEmail("");
    setError("");
  };

  // ✅ Verify member (TEMP)
  const handleVerify = (index: number) => {
    const updated = [...members];
    updated[index].verified = true; // 🔥 simulate success

    setMembers(updated);
  };

  // ✅ Check all verified
  const allVerified = members.every((m) => m.verified);

  // ✅ Submit
  const handleSubmit = () => {
    if (!selectedCoordinator) return;

    mutate({
      projectId: project.id,
      coordinatorId: selectedCoordinator,
      members: [], // 🔥 backend auto adds leader
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0B0F1A] w-full max-w-2xl rounded-xl p-6 space-y-5 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          <X />
        </button>

        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold">
            Apply for Project
          </h2>
          <p className="text-gray-400 text-sm">
            {project.title}
          </p>
        </div>

        {/* Leader */}
        <div>
          <label className="text-sm text-gray-400">
            Group Leader
          </label>
          <input
            value={user?.email || ""}
            disabled
            className="w-full mt-1 bg-[#020817] border border-gray-800 rounded-md p-2 text-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            You are the group leader
          </p>
        </div>

        {/* Members */}
        <div>
          <label className="text-sm text-gray-400">
            Group Members
          </label>

          {/* Input */}
          <div className="flex gap-2 mt-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter member email"
              className="flex-1 bg-[#020817] border border-gray-800 rounded-md p-2"
            />

            <button
              onClick={handleAddMember}
              className="bg-green-600 px-3 rounded-md text-black"
            >
              Add
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
          )}

          {/* Members List */}
          <div className="mt-3 space-y-2">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#020817] p-2 rounded"
              >
                <div>
                  <p className="text-sm">{member.email}</p>

                  {member.verified ? (
                    <p className="text-green-500 text-xs">
                      Verified
                    </p>
                  ) : (
                    <p className="text-yellow-500 text-xs">
                      Not Verified
                    </p>
                  )}
                </div>

                {!member.verified && (
                  <button
                    onClick={() => handleVerify(index)}
                    className="text-sm bg-blue-600 px-3 py-1 rounded"
                  >
                    Verify
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-yellow-500 mt-2">
            Members will be validated once verification API is ready
          </p>
        </div>

        {/* Coordinator */}
        <div>
          <label className="text-sm text-gray-400">
            Select Faculty Mentor
          </label>

          <select
            value={selectedCoordinator}
            onChange={(e) => setSelectedCoordinator(e.target.value)}
            className="w-full mt-1 bg-[#020817] border border-gray-800 rounded-md p-2"
          >
            <option value="">Choose a mentor</option>

            {project.mentors?.map((mentor: any) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-700 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedCoordinator || !allVerified || isPending}
            className={`px-4 py-2 rounded-md text-black ${
              !selectedCoordinator || !allVerified || isPending
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplyProjectModal;