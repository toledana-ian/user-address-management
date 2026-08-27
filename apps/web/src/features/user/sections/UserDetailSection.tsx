import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { createAddress } from "../../address/api/createAddress";
import type { CreateAddressPayload } from "../../address/api/createAddress";
import { deleteAddress } from "../../address/api/deleteAddress";
import { setPrimaryAddress } from "../../address/api/setPrimaryAddress";
import { updateAddress } from "../../address/api/updateAddress";
import AddAddressDialog from "../../address/components/AddAddressDialog";
import DeleteAddressDialog from "../../address/components/DeleteAddressDialog";
import EditAddressDialog, {
  type EditAddressFormValues,
} from "../../address/components/EditAddressDialog";
import type { Address } from "../../address/types";
import { getUser } from "../api/getUser";
import { updateUser } from "../api/updateUser";
import EditUserInfoDialog, {
  type EditUserInfoFormValues,
} from "../components/EditUserInfoDialog";
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
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isEditUserInfoOpen, setIsEditUserInfoOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

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

  const handleSaveUserInfo = async (
    targetUser: User,
    values: EditUserInfoFormValues,
  ) => {
    setUser(await updateUser(targetUser.id, values));
    setIsEditUserInfoOpen(false);
  };

  const handleMakePrimary = async (address: Address) => {
    try {
      await setPrimaryAddress(user.id, address.id);
      setUser(await getUser(user.id));
    } catch {
      setActionError("Failed to update primary address.");
    }
  };

  const handleEditAddressSave = async (
    address: Address,
    values: EditAddressFormValues,
  ) => {
    await updateAddress(user.id, address.id, values);
    setUser(await getUser(user.id));
    setAddressToEdit(null);
  };

  const handleDeleteAddressConfirm = async (address: Address) => {
    try {
      await deleteAddress(user.id, address.id);
      setUser(await getUser(user.id));
      setAddressToDelete(null);
    } catch {
      setActionError("Failed to delete address.");
    }
  };

  const handleAddAddressSave = async (values: CreateAddressPayload) => {
    await createAddress(user.id, values);
    setUser(await getUser(user.id));
    setIsAddAddressOpen(false);
  };

  return (
    <Stack spacing={3}>
      <UserProfileSection
        user={user}
        onEdit={() => setIsEditUserInfoOpen(true)}
      />
      <Divider />
      <UserAddressesSection
        addresses={user.addresses}
        onMakePrimary={handleMakePrimary}
        onEdit={setAddressToEdit}
        onDelete={setAddressToDelete}
        onAdd={() => setIsAddAddressOpen(true)}
      />
      <AddAddressDialog
        open={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        onSave={handleAddAddressSave}
      />
      <EditUserInfoDialog
        user={isEditUserInfoOpen ? user : null}
        onClose={() => setIsEditUserInfoOpen(false)}
        onSave={handleSaveUserInfo}
      />
      <EditAddressDialog
        address={addressToEdit}
        onClose={() => setAddressToEdit(null)}
        onSave={handleEditAddressSave}
      />
      <DeleteAddressDialog
        address={addressToDelete}
        onClose={() => setAddressToDelete(null)}
        onConfirm={handleDeleteAddressConfirm}
      />
      <Snackbar
        open={!!actionError}
        autoHideDuration={4000}
        onClose={() => setActionError(null)}
        message={actionError}
      />
    </Stack>
  );
};

export default UserDetailSection;
