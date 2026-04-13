import { useState } from "react";
import { X } from "lucide-react";
import { useCreateApplication } from "../hooks/useCreateApplication";
import { applicationService } from "../api/applicationService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  user: any;
}

type Member = {
  email: string;
  verified: boolean;
  userId?: string;
};

const ApplyProjectModal = ({ isOpen, onClose, project, user }: Props) => {
  const defaultCoordinatorId = "7e30e22c-3043-40e1-8dab-14842e06bc18";
  const { mutate, isPending } = useCreateApplication();

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ✅ Add member
  const handleAddMember = () => {
    if (!email) return;

    const last = members[members.length - 1];

    if (last && !last.verified) {
      return setError("Verify previous member first");
    }

    if (members.find((m) => m.email === email)) {
      return setError("Member already added");
    }

    if (members.length >= 6) {
      return setError("Max 6 members allowed");
    }

    setMembers([...members, { email, verified: false }]);
    setEmail("");
    setError("");
  };

  // ✅ VERIFY (FINAL)
  const handleVerify = async (index: number) => {
    try {
      const member = members[index];
      console.log("Verifying:", member.email);
      const res = await applicationService.verifyUser(member.email);

      const updated = [...members];

      updated[index] = {
        ...member,
        verified: true,
        userId: res.id, // ✅ IMPORTANT
      };

      setMembers(updated);
      setError("");

    } catch (err: any) {
      setError(err?.response?.data?.message || "Verification failed");
    }
  };

  const allVerified = members.every((m) => m.verified);

  // ✅ SUBMIT (FINAL)
  const handleSubmit = () => {
    const coordinatorId = selectedCoordinator || defaultCoordinatorId;
    if (!coordinatorId) {
      setError("Select coordinator");
      return;
    }

    if (!allVerified) {
      setError("Verify all members first");
      return;
    }

    const formattedMembers = members.map((m) => ({
      userId: m.userId!, // ✅ REAL ID
      role: "MEMBER" as const,
    }));

    mutate({
      projectId: project.id,
      coordinatorId: defaultCoordinatorId, // ✅ FIXED FOR TESTING
      members: formattedMembers,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0B0F1A] w-full max-w-2xl rounded-xl p-6 space-y-5 relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold">Apply for Project</h2>

        {/* Leader */}
        <input
          value={user?.email || ""}
          disabled
          className="w-full bg-[#020817] p-2 rounded"
        />

        {/* Members */}
        <div>
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Member email"
              className="flex-1 bg-[#020817] p-2 rounded"
            />

            <button onClick={handleAddMember} className="bg-green-600 px-3">
              Add
            </button>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          {members.map((m, i) => (
            <div key={i} className="flex justify-between mt-2 items-center">
              <span>{m.email}</span>

              {!m.verified ? (
                <button
                  onClick={() => handleVerify(i)}
                  className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  Verify
                </button>
              ) : (
                <span className="text-green-500 text-sm">Verified ✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Coordinator */}
        <select
          value={selectedCoordinator}
          onChange={(e) => setSelectedCoordinator(e.target.value)}
          className="w-full bg-[#020817] p-2 rounded"
        >
          <option value="">Select Coordinator</option>

          {project.mentors?.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            disabled={ !allVerified || isPending}
            className="bg-green-600 px-4 py-2 rounded text-black"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplyProjectModal;