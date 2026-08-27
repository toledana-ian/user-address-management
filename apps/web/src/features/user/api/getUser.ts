import { apiClient } from "../../../lib/apiClient";
import type { User } from "../types";

export async function getUser(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}
