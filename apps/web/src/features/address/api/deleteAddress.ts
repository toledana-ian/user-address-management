import { apiClient } from "../../../lib/apiClient";

export async function deleteAddress(
  userId: number,
  addressId: number,
): Promise<void> {
  await apiClient.delete(`/users/${userId}/addresses/${addressId}`);
}
