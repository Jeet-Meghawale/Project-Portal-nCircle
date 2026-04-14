const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "green" | "blue" | "purple";
}) => {

  const colorMap = {
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition">

      <p className="text-gray-400 text-sm mb-2">{title}</p>

      <h2 className={`text-3xl font-semibold ${colorMap[color]}`}>
        {value}
      </h2>

    </div>
  );
};

export default StatCard;