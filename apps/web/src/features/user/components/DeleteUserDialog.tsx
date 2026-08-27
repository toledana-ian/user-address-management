import { useState } from "react";
import Button from "@mui/material/Button";
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
    if (!user) {
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm(user);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={!!user} onClose={onClose}>
      <DialogTitle>Delete user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {user
            ? `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
