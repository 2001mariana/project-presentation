import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "admin",
    status: "active",
    createdAt: "2025-02-12T10:30:00.000Z",
  },
  {
    id: "user-2",
    name: "João Santos",
    email: "joao.santos@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2025-03-04T14:15:00.000Z",
  },
  {
    id: "user-3",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    role: "user",
    status: "active",
    createdAt: "2025-04-18T08:45:00.000Z",
  },
  {
    id: "user-4",
    name: "Rafael Lima",
    email: "rafael.lima@example.com",
    role: "admin",
    status: "inactive",
    createdAt: "2025-05-22T16:00:00.000Z",
  },
];