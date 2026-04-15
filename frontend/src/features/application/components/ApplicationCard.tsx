import ApprovalButtons from "./ApprovalButtons";

const ApplicationCard = ({ application }: any) => {
  const leader = application.leader;
  const project = application.project;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 space-y-4">

      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold">
          {leader?.firstName} {leader?.lastName}
        </h2>
        <p className="text-sm text-gray-400">
          {leader?.email}
        </p>
      </div>

      {/* PROJECT */}
      <div className="text-sm text-gray-300">
        Project:{" "}
        <span className="text-white font-medium">
          {project?.title}
        </span>
      </div>

      {/* MEMBERS */}
      <div className="text-sm text-gray-400">
        Members: {application.members?.length}
      </div>

      {/* STATUS */}
      <div>
        <span className="text-xs px-2 py-1 rounded bg-yellow-600 text-black">
          {application.status}
        </span>
      </div>
      <div className="text-sm text-gray-400">
        <p className="font-medium">Proposed Solution:</p>
        <p>{application.proposed_solution}</p>
      </div>

      {/* ACTIONS */}
      {["PENDING_COORDINATOR", "PENDING_ADMIN"].includes(application.status) && (
        <ApprovalButtons applicationId={application.id} />
      )}
    </div>
  );
};

export default ApplicationCard;