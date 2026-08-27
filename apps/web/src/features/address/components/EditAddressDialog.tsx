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
import type { Address } from "../types";

export interface EditAddressFormValues {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface EditAddressDialogProps {
  address: Address | null;
  onClose: () => void;
  onSave: (address: Address, values: EditAddressFormValues) => Promise<void>;
}

interface EditAddressFormProps {
  address: Address;
  isSaving: boolean;
  onSaveStart: () => void;
  onSaveEnd: () => void;
  onClose: () => void;
  onSave: EditAddressDialogProps["onSave"];
}

const EditAddressForm = ({
  address,
  isSaving,
  onSaveStart,
  onSaveEnd,
  onClose,
  onSave,
}: EditAddressFormProps) => {
  const [label, setLabel] = useState(address.label);
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [country, setCountry] = useState(address.country);
  const [error, setError] = useState<string | null>(null);

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
    onClose();
  };

  const handleSave = async () => {
    if (!isValid || isSaving) {
      return;
    }

    onSaveStart();
    setError(null);
    try {
      await onSave(address, {
        label: label.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
      });
    } catch {
      setError("Failed to save changes.");
    } finally {
      onSaveEnd();
    }
  };

  return (
    <>
      <DialogTitle>Edit address</DialogTitle>
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
    </>
  );
};

const EditAddressDialog = ({
  address,
  onClose,
  onSave,
}: EditAddressDialogProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    if (isSaving) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={!!address}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      transitionDuration={{ enter: 225, exit: 0 }}
    >
      {address ? (
        <EditAddressForm
          key={address.id}
          address={address}
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

export default EditAddressDialog;
