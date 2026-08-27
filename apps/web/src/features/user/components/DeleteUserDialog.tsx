import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { User } from "../types";

interface DeleteUserDialogProps {
  user: User | null;
  onClose: () => void;
  onConfirm: (user: User) => Promise<void>;
}

const DeleteUserDialog = ({
  user,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!user || isDeleting) {
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm(user);
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
      open={!!user}
      onClose={handleClose}
      transitionDuration={{ enter: 225, exit: 0 }}
    >
      <DialogTitle>Delete user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {user
            ? `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`
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

export default DeleteUserDialog;
