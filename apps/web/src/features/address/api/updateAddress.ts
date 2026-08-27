import { apiClient } from "../../../lib/apiClient";
import type { Address } from "../types";

export interface UpdateAddressPayload {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function updateAddress(
  userId: number,
  addressId: number,
  payload: UpdateAddressPayload,
): Promise<Address> {
  const response = await apiClient.patch<Address>(
    `/users/${userId}/addresses/${addressId}`,
    payload,
  );
  return response.data;
}
