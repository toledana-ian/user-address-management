import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../lib/stringAvatar";
import type { User } from "../types";

interface UserProfileSectionProps {
  user: User;
}

const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const avatar = stringAvatar(fullName);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        {...avatar}
        sx={{ ...avatar.sx, width: 64, height: 64, fontSize: 24 }}
      />
      <Box>
        <Typography variant="pageTitle">{fullName}</Typography>
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
