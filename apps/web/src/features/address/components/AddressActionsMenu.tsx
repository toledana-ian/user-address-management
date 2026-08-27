import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { Address } from "../types";

interface AddressActionsMenuProps {
  address: Address;
  onMakePrimary: (address: Address) => void;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
}

const AddressActionsMenu = ({
  address,
  onMakePrimary,
  onEdit,
  onDelete,
}: AddressActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleAction = (action: (address: Address) => void) => {
    handleClose();
    action(address);
  };

  return (
    <>
      <IconButton
        size="small"
        aria-label="Address actions"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ width: 32, height: 32, marginTop: -1, marginRight: -1 }}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={{ enter: 150, exit: 0 }}
      >
        {!address.primary ? (
          <MenuItem onClick={() => handleAction(onMakePrimary)}>
            <ListItemIcon>
              <StarBorderOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Make primary address</ListItemText>
          </MenuItem>
        ) : null}
        <MenuItem onClick={() => handleAction(onEdit)}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAction(onDelete)}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AddressActionsMenu;
