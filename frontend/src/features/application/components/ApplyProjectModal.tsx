import { useState } from "react";
import { X } from "lucide-react";
import { useCreateApplication } from "../hooks/useCreateApplication";
import { useCoordinators } from "../hooks/useCoordinators";
import { applicationService } from "../api/applicationService";

const ApplyProjectModal = ({ isOpen, onClose, project, user }: any) => {
  const { mutate, isPending } = useCreateApplication();
  const { data: coordinators = [] } = useCoordinators();

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [proposedSolution, setProposedSolution] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ADD MEMBER
  const handleAddMember = () => {
    if (!email) return;

    if (members.find((m) => m.email === email)) {
      return setError("Member already added");
    }

    setMembers([...members, { email, verified: false }]);
    setEmail("");
    setError("");
  };

  // VERIFY
  const handleVerify = async (index: number) => {
    try {
      const member = members[index];

      const res = await applicationService.verifyUser(member.email);

      const updated = [...members];
      updated[index] = {
        ...member,
        verified: true,
        userId: res.id, // ✅ NOW WORKS
      };

      setMembers(updated);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Verification failed");
    }
  };

  // REMOVE
  const handleRemove = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const allVerified = members.every((m) => m.verified);

  // SUBMIT
  const handleSubmit = () => {
    if (!selectedCoordinator) return setError("Select coordinator");
    if (!proposedSolution.trim()) return setError("Solution required");
    if (!allVerified) return setError("Verify members first");

    const formattedMembers = members.map((m) => ({
      userId: m.userId,
      role: "MEMBER" as const,
    }));

    mutate({
      projectId: project.id,
      coordinatorId: selectedCoordinator,
      proposed_solution: proposedSolution,
      members: formattedMembers,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0B0F1A] w-full max-w-2xl rounded-xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2>Apply for Project</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-5 overflow-y-auto">

          {/* LEADER */}
          <input value={user?.email} disabled className="w-full p-2 bg-[#020817]" />

          {/* MEMBERS */}
          <div>
            <div className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Member email"
                className="flex-1 p-2 bg-[#020817]"
              />
              <button onClick={handleAddMember} className="bg-green-600 px-3">
                Add
              </button>
            </div>

            {members.map((m, i) => (
              <div key={i} className="flex justify-between mt-2">
                <span>{m.email}</span>

                <div className="flex gap-2">
                  {!m.verified && (
                    <button onClick={() => handleVerify(i)}>Verify</button>
                  )}

                  <button onClick={() => handleRemove(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* SOLUTION */}
          <textarea
            value={proposedSolution}
            onChange={(e) => setProposedSolution(e.target.value)}
            placeholder="Proposed Solution"
            className="w-full p-2 bg-[#020817]"
          />

          {/* COORDINATOR */}
          <select
            value={selectedCoordinator}
            onChange={(e) => setSelectedCoordinator(e.target.value)}
            className="w-full p-2 bg-[#020817]"
          >
            <option value="">Select Coordinator</option>
            {coordinators.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        {/* FOOTER */}
        <div className="p-4 flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            disabled={!selectedCoordinator || !allVerified || isPending}
            className="bg-green-600 px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyProjectModal;