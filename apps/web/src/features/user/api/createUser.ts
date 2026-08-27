import { apiClient } from "../../../lib/apiClient";
import type { User } from "../types";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const response = await apiClient.post<User>("/users", payload);
  return response.data;
}
