import { User } from "../types/userTypes";

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="space-y-6">
      
      {/* 🔷 PROFILE CARD */}
      <div className="bg-[#0B0F19] border border-gray-800 rounded-2xl overflow-hidden">
        
        {/* TOP SECTION */}
        <div className="flex items-center gap-4 p-6">
          
          {/* Avatar */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name + Role */}
          <div>
            <h2 className="text-xl text-white font-semibold">
              {user.name}
            </h2>

            <span className="inline-block mt-1 text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800" />

        {/* FORM SECTION */}
        <div className="p-6 space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              👤 Full Name
            </label>
            <input
              value={user.name}
              disabled
              className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-lg p-3 text-white outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              ✉️ Email Address
            </label>
            <input
              value={user.email}
              disabled
              className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-lg p-3 text-white outline-none"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              disabled
              className="bg-green-500 text-black px-5 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* 🔷 ACCOUNT INFO */}
      <div className="bg-[#0B0F19] border border-gray-800 rounded-2xl p-6">
        
        <h3 className="text-white font-semibold mb-4">
          Account Information
        </h3>

        <div className="space-y-4 text-sm">
          
        

          {/* ROLE */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-gray-400">Role</span>
            <span className="text-white">{user.role}</span>
          </div>

          {/* STATUS */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Account Status</span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;