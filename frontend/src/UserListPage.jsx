import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Link as RouterLink } from 'react-router-dom'
import { api } from './api'

function UserIdentity({ user }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar className="user-avatar">
        {user.firstName[0]}{user.lastName[0]}
      </Avatar>
      <Box minWidth={0}>
        <Typography fontWeight={700} noWrap>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {user.email}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function UserListPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    api.listUsers(controller.signal)
      .then((data) => {
        setUsers(data)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [reloadKey])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return users
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(query),
    )
  }, [search, users])

  const retry = () => {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }

  return (
    <Stack spacing={3.5}>
      <Box className="page-heading">
        <Box>
          <Typography variant="overline" color="primary" fontWeight={750}>
            Directory
          </Typography>
          <Typography variant="h4">Users</Typography>
          <Typography color="text.secondary" mt={0.75}>
            Find customers and manage their profile and delivery addresses.
          </Typography>
        </Box>
        {!loading && !error && (
          <Chip
            icon={<PeopleAltRoundedIcon />}
            label={`${users.length} ${users.length === 1 ? 'user' : 'users'}`}
            className="count-chip"
          />
        )}
      </Box>

      <Paper variant="outlined" className="content-card">
        <Box className="table-toolbar">
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {loading ? (
          <Box className="center-state compact">
            <CircularProgress size={28} />
            <Typography color="text.secondary">Loading users…</Typography>
          </Box>
        ) : error ? (
          <Box p={3}>
            <Alert
              severity="error"
              action={<Button color="inherit" size="small" onClick={retry}>Retry</Button>}
            >
              {error}
            </Alert>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Box className="center-state compact">
            <SearchRoundedIcon className="empty-icon" />
            <Typography variant="h6">No users found</Typography>
            <Typography color="text.secondary">
              Try a different name or email address.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer className="desktop-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Addresses</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell><UserIdentity user={user} /></TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {user.addressCount} {user.addressCount === 1 ? 'address' : 'addresses'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={RouterLink}
                          to={`/users/${user.id}`}
                          endIcon={<ArrowForwardRoundedIcon />}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack className="mobile-users" divider={<Box className="mobile-divider" />}>
              {filteredUsers.map((user) => (
                <Stack key={user.id} spacing={2} className="mobile-user-row">
                  <UserIdentity user={user} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      {user.addressCount} {user.addressCount === 1 ? 'address' : 'addresses'}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={`/users/${user.id}`}
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      Manage
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </Stack>
  )
}
