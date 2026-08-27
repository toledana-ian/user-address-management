import { apiClient } from "../../../lib/apiClient";

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
