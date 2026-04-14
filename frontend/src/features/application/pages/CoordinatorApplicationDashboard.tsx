import ApplicationCard from "../components/ApplicationCard";
import ApplicationStats from "../components/ApplicationStats";
import { useApplicationDashboard } from "../hooks/useApplicationDashboard";

const ApplicationDashboard = () => {
  const { applications, isLoading } = useApplicationDashboard();

  if (isLoading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold">
        Application Approvals
      </h1>

      {/* Stats */}
      <ApplicationStats count={applications.length} />

      {/* Empty state */}
      {applications.length === 0 && (
        <p className="text-gray-400">
          No pending applications
        </p>
      )}

      {/* Applications list */}
      <div className="grid gap-4">
        {applications.map((app: any) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>

    </div>
  );
};

export default ApplicationDashboard;