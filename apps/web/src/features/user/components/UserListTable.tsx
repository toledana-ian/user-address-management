import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { stringAvatar } from "../../../lib/stringAvatar";
import type { User } from "../types";

interface UserListTableProps {
  users: User[];
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

const UserListTable = ({ users }: UserListTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const fullName = `${user.firstName} ${user.lastName}`;

            return (
              <TableRow key={user.id}>
                <TableCell padding="checkbox">
                  <Avatar {...stringAvatar(fullName)} />
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1">{fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{formatAddress(user)}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
