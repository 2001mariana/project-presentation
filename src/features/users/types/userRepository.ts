import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "./user";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}