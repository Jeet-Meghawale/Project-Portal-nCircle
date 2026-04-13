export type UserRole = "STUDENT" | "COORDINATOR" | "ADMIN";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;

  mobile?: string;
  college?: string;
  branch?: string;
  graduationYear?: number;
}

export interface UsersResponse {
  users: User[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}