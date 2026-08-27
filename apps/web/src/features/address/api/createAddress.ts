import { apiClient } from "../../../lib/apiClient";
import type { Address } from "../types";

export interface CreateAddressPayload {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function createAddress(
  userId: number,
  payload: CreateAddressPayload,
): Promise<Address> {
  const response = await apiClient.post<Address>(
    `/users/${userId}/addresses`,
    payload,
  );
  return response.data;
}
