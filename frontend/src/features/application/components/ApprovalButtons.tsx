import { useApproveApplication } from "../hooks/useApproveApplication";
import { useUserProfile } from "../../users/hooks/useUserProfile";

const ApprovalButtons = ({ applicationId }: { applicationId: string }) => {
  const {
    verify,
    approve,
    reject,
    isVerifying,
    isApproving,
    isRejecting,
  } = useApproveApplication();

  const { data: user } = useUserProfile();

  return (
    <div className="flex gap-2">

      {/* COORDINATOR */}
      {user?.role === "COORDINATOR" && (
        <button
          onClick={() => verify(applicationId)}
          disabled={isVerifying}
          className="flex-1 bg-green-600 hover:bg-green-700 text-black py-2 rounded-md text-sm"
        >
          {isVerifying ? "Verifying..." : "Approve"}
        </button>
      )}

      {/* ADMIN */}
      {user?.role === "ADMIN" && (
        <button
          onClick={() => approve(applicationId)}
          disabled={isApproving}
          className="flex-1 bg-green-600 hover:bg-green-700 text-black py-2 rounded-md text-sm"
        >
          {isApproving ? "Approving..." : "Final Approve"}
        </button>
      )}

      {/* COMMON */}
      <button
        onClick={() => reject(applicationId)}
        disabled={isRejecting}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm"
      >
        {isRejecting ? "Rejecting..." : "Reject"}
      </button>

    </div>
  );
};

export default ApprovalButtons;