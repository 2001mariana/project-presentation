import { mockUserRepository } from "../repositories/mockUserRepository";
import type { UserRepository } from "../types/userRepository";

// Replace this assignment with apiUserRepository when a real API is available.
export const userRepository: UserRepository = mockUserRepository;