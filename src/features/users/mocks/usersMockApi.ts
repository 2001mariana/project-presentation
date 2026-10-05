import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../types/user";
import { mockApiConfig, type MockOperation } from "./mockApiConfig";
import { mockUsersDatabase } from "./mockUsersDatabase";

function delay(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, mockApiConfig.latencyMs));
}

async function prepareRequest(operation: MockOperation): Promise<void> {
  await delay();
  if (mockApiConfig.failures[operation]) {
    throw new Error(`Falha simulada ao executar ${operation}. Tente novamente.`);
  }
}

function requireUser(user: User | undefined, id: string): User {
  if (!user) throw new Error(`Usuário ${id} não encontrado.`);
  return user;
}

function ensureUniqueEmail(email: string, ignoredId?: string): void {
  const normalizedEmail = email.trim().toLocaleLowerCase();
  const duplicate = mockUsersDatabase
    .getAll()
    .some(
      (user) =>
        user.id !== ignoredId &&
        user.email.toLocaleLowerCase() === normalizedEmail,
    );

  if (duplicate) throw new Error("Já existe um usuário com este email.");
}

export const usersMockApi = {
  async getAll(): Promise<User[]> {
    await prepareRequest("getAll");
    return mockUsersDatabase.getAll();
  },

  async getById(id: string): Promise<User> {
    await prepareRequest("getById");
    return requireUser(mockUsersDatabase.getById(id), id);
  },

  async create(data: CreateUserInput): Promise<User> {
    await prepareRequest("create");
    ensureUniqueEmail(data.email);
    return mockUsersDatabase.create({
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLocaleLowerCase(),
    });
  },

  async update(id: string, data: UpdateUserInput): Promise<User> {
    await prepareRequest("update");
    if (data.email) ensureUniqueEmail(data.email, id);

    const updatedUser = mockUsersDatabase.update(id, {
      ...data,
      ...(data.name !== undefined ? { name: data.name.trim() } : {}),
      ...(data.email !== undefined
        ? { email: data.email.trim().toLocaleLowerCase() }
        : {}),
    });

    return requireUser(updatedUser, id);
  },

  async delete(id: string): Promise<void> {
    await prepareRequest("delete");
    if (!mockUsersDatabase.delete(id)) {
      throw new Error(`Usuário ${id} não encontrado.`);
    }
  },
};