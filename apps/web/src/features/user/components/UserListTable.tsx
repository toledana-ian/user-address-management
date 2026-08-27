import { Link } from "@tanstack/react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../lib/stringAvatar";
import type { User } from "../types";

interface UserListTableProps {
  users: User[];
  onDelete: (user: User) => void;
}

function formatAddress(user: User) {
  const address =
    user.addresses.find((candidate) => candidate.primary) ?? user.addresses[0];

  if (!address) {
    return "-";
  }

  return [address.street, address.city, address.state, address.postalCode]
    .filter(Boolean)
    .join(", ");
}

const HEAD_CELL_SX = { height: 44, py: 0, px: 2 };
const BODY_CELL_SX = { height: 64, py: 0, px: 2 };

const UserListTable = ({ users, onDelete }: UserListTableProps) => {
  return (
    <Table sx={{ fontSize: 14 }}>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} sx={HEAD_CELL_SX}>
            Name
          </TableCell>
          <TableCell sx={HEAD_CELL_SX}>Primary Address</TableCell>
          <TableCell sx={{ ...HEAD_CELL_SX, width: 80, textAlign: "center" }}>
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          const address = formatAddress(user);
          const avatar = stringAvatar(fullName);

          return (
            <TableRow key={user.id} hover>
              <TableCell sx={{ ...BODY_CELL_SX, width: 0, pr: 0 }}>
                <Avatar
                  {...avatar}
                  sx={{ ...avatar.sx, width: 36, height: 36, fontSize: 14 }}
                />
              </TableCell>
              <TableCell sx={{ ...BODY_CELL_SX }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                  }}
                >
                  <Link
                    to="/user/$id"
                    params={{ id: String(user.id) }}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        fontWeight: 500,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {fullName}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ ...BODY_CELL_SX, minWidth: 200 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnOutlinedIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                  <Typography sx={{ fontSize: 14 }}>{address}</Typography>
                </Box>
              </TableCell>
              <TableCell sx={BODY_CELL_SX} align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 0.5,
                  }}
                >
                  <Tooltip title="Edit" placement={"top"}>
                    <IconButton
                      size="small"
                      aria-label="Edit"
                      sx={{ width: 32, height: 32 }}
                    >
                      <EditOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement={"top"}>
                    <IconButton
                      size="small"
                      aria-label="Delete"
                      sx={{ width: 32, height: 32 }}
                      onClick={() => onDelete(user)}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 18 }} color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserListTable;
