import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { Address } from "../../address/types";
import type { User } from "../types";

export interface EditUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface EditUserDialogProps {
  user: User | null;
  onClose: () => void;
  onSave: (
    user: User,
    values: EditUserFormValues,
    primaryAddressId: number | null,
  ) => Promise<void>;
}

function formatAddressOption(address: Address) {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
  ].filter(Boolean);
  return address.label
    ? `${address.label} — ${parts.join(", ")}`
    : parts.join(", ");
}

interface EditUserFormProps {
  user: User;
  isSaving: boolean;
  onSaveStart: () => void;
  onSaveEnd: () => void;
  onClose: () => void;
  onSave: EditUserDialogProps["onSave"];
}

const EditUserForm = ({
  user,
  isSaving,
  onSaveStart,
  onSaveEnd,
  onClose,
  onSave,
}: EditUserFormProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const initialPrimary =
    user.addresses.find((address) => address.primary) ??
    user.addresses[0] ??
    null;
  const [primaryAddressId, setPrimaryAddressId] = useState<number | null>(
    initialPrimary ? initialPrimary.id : null,
  );
  const [error, setError] = useState<string | null>(null);

  const isValid =
    firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "";

  const handleClose = () => {
    if (isSaving) {
      return;
    }
    onClose();
  };

  const handleSave = async () => {
    if (!isValid || isSaving) {
      return;
    }

    onSaveStart();
    setError(null);
    try {
      await onSave(
        user,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        },
        primaryAddressId,
      );
    } catch {
      setError("Failed to save changes.");
    } finally {
      onSaveEnd();
    }
  };

  return (
    <>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
            autoFocus
          />
          <TextField
            label="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
          />

          <Divider />

          <Typography variant="subtitle2">Primary address</Typography>
          {user.addresses.length > 0 ? (
            <RadioGroup
              value={primaryAddressId !== null ? String(primaryAddressId) : ""}
              onChange={(event) =>
                setPrimaryAddressId(Number(event.target.value))
              }
            >
              {user.addresses.map((address) => (
                <FormControlLabel
                  key={address.id}
                  value={String(address.id)}
                  disabled={isSaving}
                  control={<Radio size="small" />}
                  label={
                    <Typography variant="body2">
                      {formatAddressOption(address)}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          ) : (
            <Typography variant="body2" color="text.secondary">
              This user has no addresses yet.
            </Typography>
          )}

          {error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving || !isValid}
          startIcon={
            isSaving ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {isSaving ? "Saving…" : "Save"}
        </Button>
      </DialogActions>
    </>
  );
};

const EditUserDialog = ({ user, onClose, onSave }: EditUserDialogProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    if (isSaving) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={!!user}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      transitionDuration={{ enter: 225, exit: 0 }}
    >
      {user ? (
        <EditUserForm
          key={user.id}
          user={user}
          isSaving={isSaving}
          onSaveStart={() => setIsSaving(true)}
          onSaveEnd={() => setIsSaving(false)}
          onClose={handleClose}
          onSave={onSave}
        />
      ) : null}
    </Dialog>
  );
};

export default EditUserDialog;
