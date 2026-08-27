import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { getUser } from "../api/getUser";
import UserNotFound from "../components/UserNotFound";
import type { User } from "../types";
import UserAddressesSection from "./UserAddressesSection";
import UserProfileSection from "./UserProfileSection";

interface UserDetailSectionProps {
  id: string;
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

  return (
    <Stack spacing={3}>
      <UserProfileSection user={user} />
      <Divider />
      <UserAddressesSection addresses={user.addresses} />
    </Stack>
  );
};

export default UserDetailSection;
