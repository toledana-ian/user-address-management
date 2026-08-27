import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Address } from "../../address/types";

interface UserAddressesSectionProps {
  addresses: Address[];
}

function formatAddressLine(address: Address) {
  return [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

const UserAddressesSection = ({ addresses }: UserAddressesSectionProps) => {
  return (
    <Box>
      <Typography variant="section" gutterBottom>
        Addresses
      </Typography>
      {addresses.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          This user has no addresses yet.
        </Typography>
      ) : (
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {addresses.map((address) => (
            <Paper
              key={address.id}
              variant="outlined"
              sx={{ p: 2, borderRadius: "8px" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {address.label || "Address"}
                </Typography>
                {address.primary ? (
                  <Chip label="Primary" size="small" color="primary" />
                ) : null}
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pl: 3.5 }}
              >
                {formatAddressLine(address)}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserAddressesSection;
