import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export interface AddUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddUserAddressValues {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    values: AddUserFormValues,
    address: AddUserAddressValues,
  ) => Promise<void>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: AddUserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const INITIAL_ADDRESS: AddUserAddressValues = {
  label: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const AddUserDialog = ({ open, onClose, onSave }: AddUserDialogProps) => {
  const [firstName, setFirstName] = useState(INITIAL_VALUES.firstName);
  const [lastName, setLastName] = useState(INITIAL_VALUES.lastName);
  const [email, setEmail] = useState(INITIAL_VALUES.email);
  const [label, setLabel] = useState(INITIAL_ADDRESS.label);
  const [street, setStreet] = useState(INITIAL_ADDRESS.street);
  const [city, setCity] = useState(INITIAL_ADDRESS.city);
  const [state, setState] = useState(INITIAL_ADDRESS.state);
  const [postalCode, setPostalCode] = useState(INITIAL_ADDRESS.postalCode);
  const [country, setCountry] = useState(INITIAL_ADDRESS.country);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setFirstName(INITIAL_VALUES.firstName);
    setLastName(INITIAL_VALUES.lastName);
    setEmail(INITIAL_VALUES.email);
    setLabel(INITIAL_ADDRESS.label);
    setStreet(INITIAL_ADDRESS.street);
    setCity(INITIAL_ADDRESS.city);
    setState(INITIAL_ADDRESS.state);
    setPostalCode(INITIAL_ADDRESS.postalCode);
    setCountry(INITIAL_ADDRESS.country);
    setError(null);
  };

  const trimmedEmail = email.trim();
  const isEmailValid = EMAIL_REGEX.test(trimmedEmail);
  const showEmailError = trimmedEmail !== "" && !isEmailValid;
  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    isEmailValid &&
    street.trim() !== "" &&
    city.trim() !== "" &&
    state.trim() !== "" &&
    postalCode.trim() !== "" &&
    country.trim() !== "";

  const handleClose = () => {
    if (isSaving) {
      return;
    }
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!isValid || isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await onSave(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: trimmedEmail,
        },
        {
          label: label.trim(),
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          postalCode: postalCode.trim(),
          country: country.trim(),
        },
      );
      resetForm();
    } catch {
      setError("Failed to add user.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      transitionDuration={{ enter: 225, exit: 0 }}
    >
      <DialogTitle>Add user</DialogTitle>
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

          <Divider />

          <Typography variant="subtitle2">Primary address</Typography>
          <TextField
            label="Label"
            placeholder="Home"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
          />
          <TextField
            label="Street"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              size="small"
              fullWidth
              disabled={isSaving}
            />
            <TextField
              label="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
              size="small"
              fullWidth
              disabled={isSaving}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Postal code"
              value={postalCode}
              onChange={(event) =>
                setPostalCode(event.target.value.replace(/\D/g, ""))
              }
              slotProps={{ htmlInput: { inputMode: "numeric" } }}
              size="small"
              fullWidth
              disabled={isSaving}
            />
            <TextField
              label="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              size="small"
              fullWidth
              disabled={isSaving}
            />
          </Stack>

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
    </Dialog>
  );
};

export default AddUserDialog;
