import { apiClient } from "../../../lib/apiClient";
import type { User } from "../types";

export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export async function updateUser(
  id: number,
  payload: UpdateUserPayload,
): Promise<User> {
  const response = await apiClient.patch<User>(`/users/${id}`, payload);
  return response.data;
}
