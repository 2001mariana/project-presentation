import type {
  CreateUserInput,
  UpdateUserInput,
} from "../types/user";
import { userRepository } from "./userRepository";

export const userService = {
  getUsers: () => userRepository.getAll(),
  getUserById: (id: string) => userRepository.getById(id),
  createUser: (data: CreateUserInput) => userRepository.create(data),
  updateUser: (id: string, data: UpdateUserInput) =>
    userRepository.update(id, data),
  deleteUser: (id: string) => userRepository.delete(id),
};