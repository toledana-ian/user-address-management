import { useEffect, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { deleteUser } from "../api/deleteUser";
import { getUsers } from "../api/getUsers";
import DeleteUserDialog from "../components/DeleteUserDialog";
import UserListTable from "../components/UserListTable";
import UserTableToolbar from "../components/UserTableToolbar";
import UsersPageHeader from "../components/UsersPageHeader";
import type { User } from "../types";

const PAGE_SIZE = 10;

function matchesSearch(user: User, search: string) {
  const term = search.trim().toLowerCase();
  if (!term) {
    return true;
  }

  return (
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
}

const UserListSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getUsers()
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load users.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesSearch(user, search)),
    [users, search],
  );

  const [appliedSearch, setAppliedSearch] = useState(search);
  if (appliedSearch !== search) {
    setAppliedSearch(search);
    setPage(1);
  }

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const rangeStart =
    filteredUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredUsers.length);

  const handleDeleteConfirm = async (user: User) => {
    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((candidate) => candidate.id !== user.id));
      setUserToDelete(null);
    } catch {
      setDeleteError("Failed to delete user.");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <UsersPageHeader search={search} onSearchChange={setSearch} />
      <Paper
        variant="outlined"
        sx={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <UserListTable users={pagedUsers} onDelete={setUserToDelete} />
        <UserTableToolbar
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          total={filteredUsers.length}
        />
      </Paper>
      <DeleteUserDialog
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
      <Snackbar
        open={!!deleteError}
        autoHideDuration={4000}
        onClose={() => setDeleteError(null)}
        message={deleteError}
      />
    </>
  );
};

export default UserListSection;
