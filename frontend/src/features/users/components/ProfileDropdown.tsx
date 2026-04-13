import { useNavigate } from "react-router-dom";

interface Props {
  user: {
    fullName: string;
    email: string;
  };
  onLogout: () => void;
}

const ProfileDropdown = ({ user, onLogout }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-12 w-72 bg-[#0B0F19] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
      
      {/* USER INFO */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
          {user.fullName?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-white font-medium">{user.fullName}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="p-2">
        
        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-200 transition"
        >
          👤 Profile
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;