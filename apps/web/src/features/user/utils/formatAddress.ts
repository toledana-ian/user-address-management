import type { User } from "../types";

export function formatAddress(user: User) {
  const address =
    user.addresses.find((candidate) => candidate.primary) ?? user.addresses[0];

  if (!address) {
    return "-";
  }

  return [address.street, address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(", ");
}
