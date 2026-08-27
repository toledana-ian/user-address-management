import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { Address } from "../types";

interface DeleteAddressDialogProps {
  address: Address | null;
  onClose: () => void;
  onConfirm: (address: Address) => Promise<void>;
}

const DeleteAddressDialog = ({
  address,
  onClose,
  onConfirm,
}: DeleteAddressDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!address || isDeleting) {
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm(address);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={!!address}
      onClose={handleClose}
      transitionDuration={{ enter: 225, exit: 0 }}
    >
      <DialogTitle>Delete address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {address
            ? `Are you sure you want to delete ${
                address.label || "this address"
              }? This action cannot be undone.`
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          disabled={isDeleting}
          startIcon={
            isDeleting ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAddressDialog;
