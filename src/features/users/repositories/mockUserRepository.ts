import type { UserRepository } from "../types/userRepository";
import { usersMockApi } from "../mocks/usersMockApi";

export const mockUserRepository: UserRepository = {
  getAll: () => usersMockApi.getAll(),
  getById: (id) => usersMockApi.getById(id),
  create: (data) => usersMockApi.create(data),
  update: (id, data) => usersMockApi.update(id, data),
  delete: (id) => usersMockApi.delete(id),
};