export type UserRole = "admin" | "user";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export type CreateUserInput = Pick<
  User,
  "name" | "email" | "role" | "status"
>;

export type UpdateUserInput = Partial<CreateUserInput>;

export interface UserFilters {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
}