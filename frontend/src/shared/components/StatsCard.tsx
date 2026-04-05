type Props = {
  title: string;
  value: number | string;
  subtitle: string;
};

const StatsCard = ({ title, value, subtitle }: any) => {
  return (
    <div className="card card-hover">
      <p className="text-sm text-gray-400">{title}</p>

      <h2 className="text-3xl font-semibold mt-3">{value}</h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default StatsCard;