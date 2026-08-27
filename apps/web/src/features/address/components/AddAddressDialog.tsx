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
import type { CreateAddressPayload } from "../api/createAddress";

interface AddAddressDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: CreateAddressPayload) => Promise<void>;
}

const INITIAL_VALUES: CreateAddressPayload = {
  label: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const AddAddressDialog = ({ open, onClose, onSave }: AddAddressDialogProps) => {
  const [label, setLabel] = useState(INITIAL_VALUES.label);
  const [street, setStreet] = useState(INITIAL_VALUES.street);
  const [city, setCity] = useState(INITIAL_VALUES.city);
  const [state, setState] = useState(INITIAL_VALUES.state);
  const [postalCode, setPostalCode] = useState(INITIAL_VALUES.postalCode);
  const [country, setCountry] = useState(INITIAL_VALUES.country);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setLabel(INITIAL_VALUES.label);
    setStreet(INITIAL_VALUES.street);
    setCity(INITIAL_VALUES.city);
    setState(INITIAL_VALUES.state);
    setPostalCode(INITIAL_VALUES.postalCode);
    setCountry(INITIAL_VALUES.country);
    setError(null);
  };

  const isValid =
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
      await onSave({
        label: label.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
      });
      resetForm();
    } catch {
      setError("Failed to add address.");
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
      <DialogTitle>Add address</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Label"
            placeholder="Home"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            size="small"
            fullWidth
            disabled={isSaving}
            autoFocus
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

export default AddAddressDialog;
