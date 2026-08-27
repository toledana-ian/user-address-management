import { apiClient } from "../../../lib/apiClient";
import type { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
}
