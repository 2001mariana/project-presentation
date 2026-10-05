export type MockOperation = "getAll" | "getById" | "create" | "update" | "delete";

// Set an operation to true to demonstrate an API failure during a lesson.
export const mockApiConfig: {
  latencyMs: number;
  failures: Record<MockOperation, boolean>;
} = {
  latencyMs: 500,
  failures: {
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false,
  },
};