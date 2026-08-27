import type { Address } from "../../address/types";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}
