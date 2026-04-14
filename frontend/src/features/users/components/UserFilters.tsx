interface Props {
  search: string;
  setSearch: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
}

const UserFilters = ({ search, setSearch, role, setRole }: Props) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        placeholder="Search..."
        className="border p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All</option>
        <option value="STUDENT">Student</option>
        <option value="COORDINATOR">Coordinator</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
  );
};

export default UserFilters;