import StatsCard from "../../../shared/components/StatsCard";

const CoordinatorStats = ({
  totalProjects,
  openProjects,
  pendingApplications,
}: {
  totalProjects: number;
  openProjects: number;
  pendingApplications: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard title="Total Projects" value={totalProjects} />
      <StatsCard title="Open Projects" value={openProjects} />
      <StatsCard
        title="Pending Approvals"
        value={pendingApplications}
      />
      <StatsCard title="Your Role" value="Faculty" />
    </div>
  );
};

export default CoordinatorStats;