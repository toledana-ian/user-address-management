import { useEffect, useState } from "react";
import axios from "axios";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../lib/stringAvatar";
import { getUser } from "../api/getUser";
import UserNotFound from "../components/UserNotFound";
import type { User } from "../types";

interface UserDetailSectionProps {
  id: string;
}

function formatAddressLine(address: User["addresses"][number]) {
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

const UserDetailSection = ({ id }: UserDetailSectionProps) => {
  const numericId = Number(id);
  const isValidId = Number.isInteger(numericId) && numericId > 0;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchNotFound, setFetchNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidId) {
      return;
    }

    let isMounted = true;

    getUser(numericId)
      .then((data) => {
        if (isMounted) {
          setUser(data);
        }
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setFetchNotFound(true);
        } else {
          setError("Failed to load user.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [numericId, isValidId]);

  if (isValidId && isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isValidId || fetchNotFound) {
    return <UserNotFound />;
  }

  if (error || !user) {
    return <Alert severity="error">{error ?? "Failed to load user."}</Alert>;
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const avatar = stringAvatar(fullName);

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          {...avatar}
          sx={{ ...avatar.sx, width: 64, height: 64, fontSize: 24 }}
        />
        <Box>
          <Typography variant="pageTitle">{fullName}</Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
          >
            <EmailOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="section" gutterBottom>
          Addresses
        </Typography>
        {user.addresses.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            This user has no addresses yet.
          </Typography>
        ) : (
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {user.addresses.map((address) => (
              <Paper
                key={address.id}
                variant="outlined"
                sx={{ p: 2, borderRadius: "8px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
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
    </Stack>
  );
};

export default UserDetailSection;
