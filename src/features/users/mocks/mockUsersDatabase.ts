import { mockUsers } from "./mockUsers";
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../types/user";

let users: User[] = mockUsers.map((user) => ({ ...user }));

function copyUser(user: User): User {
  return { ...user };
}

export const mockUsersDatabase = {
  getAll(): User[] {
    return users.map(copyUser);
  },

  getById(id: string): User | undefined {
    const user = users.find((item) => item.id === id);
    return user ? copyUser(user) : undefined;
  },

  create(data: CreateUserInput): User {
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    users = [user, ...users];
    return copyUser(user);
  },

  update(id: string, data: UpdateUserInput): User | undefined {
    const userIndex = users.findIndex((item) => item.id === id);
    if (userIndex < 0) return undefined;

    const updatedUser = { ...users[userIndex], ...data };
    users = users.map((user) => (user.id === id ? updatedUser : user));
    return copyUser(updatedUser);
  },

  delete(id: string): boolean {
    const userExists = users.some((user) => user.id === id);
    if (!userExists) return false;

    users = users.filter((user) => user.id !== id);
    return true;
  },
};