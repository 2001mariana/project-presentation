import type { User } from "../types/user";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERS_API_URL, { method: "GET" });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const users = (await response.json()) as User[];
  return users;
}
