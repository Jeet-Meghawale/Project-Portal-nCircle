const applicationStats = ({ count }: { count: number }) => {
  return (
    <div className="bg-[#0B0F1A] p-4 rounded-lg border border-gray-800">
      <p className="text-gray-400 text-sm">Pending Applications</p>
      <h2 className="text-2xl font-semibold">{count}</h2>
    </div>
  );
};

export default applicationStats;