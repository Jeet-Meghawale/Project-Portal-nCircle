import ProfileCard from "../components/ProfileCrad";
import { useUserProfile } from "../hooks/useUserProfile";

const ProfilePage = () => {
  const { data, isLoading } = useUserProfile();

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!data) return <p className="text-red-500">No data</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Profile
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your account settings
        </p>
      </div>

      {/* CONTENT */}
      <ProfileCard user={data} />
    </div>
  );
};

export default ProfilePage;