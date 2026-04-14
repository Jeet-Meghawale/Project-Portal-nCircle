import ApplicationCard from "../components/ApplicationCard";
import { useAdminApplications } from "../hooks/useAdminApplications";

const AdminApplicationDashboard = () => {
  const { applications, isLoading } = useAdminApplications();

  if (isLoading) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-semibold text-white">
          Final Approvals
        </h1>

        {applications.length === 0 && (
          <p className="text-gray-400">
            No applications pending approval
          </p>
        )}

        <div className="grid gap-4">
          {applications.map((app: any) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>

      </div>
  );
};

export default AdminApplicationDashboard;