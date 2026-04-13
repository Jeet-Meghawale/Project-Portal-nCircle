import { User } from "../types/userTypes";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.firstName} {u.lastName}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;