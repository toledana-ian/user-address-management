import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { User } from "../types";

export interface EditUserInfoFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface EditUserInfoDialogProps {
  user: User | null;
  onClose: () => void;
  onSave: (user: User, values: EditUserInfoFormValues) => Promise<void>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EditUserInfoFormProps {
  user: User;
  isSaving: boolean;
  onSaveStart: () => void;
  onSaveEnd: () => void;
  onClose: () => void;
  onSave: EditUserInfoDialogProps["onSave"];
}

const EditUserInfoForm = ({
  user,
  isSaving,
  onSaveStart,
  onSaveEnd,
  onClose,
  onSave,
}: EditUserInfoFormProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState<string | null>(null);

  const trimmedEmail = email.trim();
  const isEmailValid = EMAIL_REGEX.test(trimmedEmail);
  const showEmailError = trimmedEmail !== "" && !isEmailValid;
  const isValid =
    firstName.trim() !== "" && lastName.trim() !== "" && isEmailValid;

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
      await onSave(user, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: trimmedEmail,
      });
    } catch {
      setError("Failed to save changes.");
    } finally {
      onSaveEnd();
    }
  };

  return (
    <>
      <DialogTitle>Edit user info</DialogTitle>
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
            error={showEmailError}
            helperText={
              showEmailError ? "Enter a valid email address." : undefined
            }
          />

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

const EditUserInfoDialog = ({
  user,
  onClose,
  onSave,
}: EditUserInfoDialogProps) => {
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
        <EditUserInfoForm
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

export default EditUserInfoDialog;
