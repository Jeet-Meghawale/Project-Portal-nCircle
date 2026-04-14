interface Props {
  label: string;
  type?: string;
  onChange: (val: string) => void;
}

const Input = ({ label, type = "text", onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        className="bg-[#0B0F19] border border-gray-700 rounded-lg p-2 focus:border-green-400 outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;