import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../lib/stringAvatar";
import type { User } from "../types";

interface UserProfileSectionProps {
  user: User;
  onEdit: () => void;
}

const UserProfileSection = ({ user, onEdit }: UserProfileSectionProps) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const avatar = stringAvatar(fullName);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        {...avatar}
        sx={{ ...avatar.sx, width: 64, height: 64, fontSize: 24 }}
      />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="pageTitle">{fullName}</Typography>
          <IconButton
            size="small"
            aria-label="Edit user info"
            onClick={onEdit}
            sx={{ width: 32, height: 32 }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
          <EmailOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileSection;
