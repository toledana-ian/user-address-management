import { apiClient } from "../../../lib/apiClient";
import type { Address } from "../types";

export async function setPrimaryAddress(
  userId: number,
  addressId: number,
): Promise<Address> {
  const response = await apiClient.patch<Address>(
    `/users/${userId}/addresses/${addressId}/primary`,
  );
  return response.data;
}
