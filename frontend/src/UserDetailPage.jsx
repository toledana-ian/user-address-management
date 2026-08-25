import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import { Link as RouterLink, useParams } from 'react-router-dom'
import AddressEditor from './AddressEditor'
import { api } from './api'

function ProfileSection({ user, onUpdated }) {
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const startEditing = () => {
    setValues({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    setError('')
    setFieldErrors({})
    setEditing(true)
  }

  const cancel = () => {
    setEditing(false)
    setValues(null)
    setError('')
  }

  const change = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  const save = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setFieldErrors({})
    try {
      const updated = await api.updateProfile(user.id, values)
      onUpdated(updated)
      setEditing(false)
      setValues(null)
    } catch (saveError) {
      setError(saveError.message)
      setFieldErrors(saveError.fieldErrors || {})
    } finally {
      setSaving(false)
    }
  }

  return (
    <Paper variant="outlined" className="section-card">
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="section-header">
        <Box>
          <Typography variant="h6" fontWeight={750}>Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            Customer identity and contact information
          </Typography>
        </Box>
        {!editing && (
          <Button startIcon={<EditOutlinedIcon />} onClick={startEditing}>Edit</Button>
        )}
      </Stack>
      <Divider />
      {editing ? (
        <Box component="form" onSubmit={save} className="section-body">
          <Stack spacing={2.25}>
            {error && <Alert severity="error">{error}</Alert>}
            <Box className="profile-grid">
              <TextField
                label="First name"
                value={values.firstName}
                onChange={change('firstName')}
                error={Boolean(fieldErrors.firstName)}
                helperText={fieldErrors.firstName}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 100 } }}
              />
              <TextField
                label="Last name"
                value={values.lastName}
                onChange={change('lastName')}
                error={Boolean(fieldErrors.lastName)}
                helperText={fieldErrors.lastName}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 100 } }}
              />
              <TextField
                className="profile-email"
                label="Email address"
                type="email"
                value={values.email}
                onChange={change('email')}
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 254 } }}
              />
            </Box>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={cancel} disabled={saving}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? <CircularProgress size={20} color="inherit" /> : 'Save profile'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Stack className="section-body profile-summary" spacing={2.25}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box className="detail-icon"><PersonOutlineRoundedIcon /></Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Full name</Typography>
              <Typography fontWeight={650}>{user.firstName} {user.lastName}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box className="detail-icon"><MailOutlineRoundedIcon /></Box>
            <Box minWidth={0}>
              <Typography variant="caption" color="text.secondary">Email address</Typography>
              <Typography fontWeight={650} className="break-word">{user.email}</Typography>
            </Box>
          </Stack>
        </Stack>
      )}
    </Paper>
  )
}

function AddressCard({ address, isEditing, actionsDisabled, onEdit, onCancel, onSave, onDelete }) {
  if (isEditing) {
    return (
      <Paper variant="outlined" className="address-card editing">
        <Typography variant="subtitle1" fontWeight={750} mb={2.5}>Edit address</Typography>
        <AddressEditor
          initialValue={address}
          onSave={onSave}
          onCancel={onCancel}
          submitLabel="Save changes"
        />
      </Paper>
    )
  }

  return (
    <Paper variant="outlined" className="address-card">
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Stack direction="row" spacing={1.5} minWidth={0}>
          <Box className="detail-icon address-icon"><HomeWorkOutlinedIcon /></Box>
          <Box minWidth={0}>
            <Chip label={address.label} size="small" className="address-label" />
            <Typography mt={1.5} fontWeight={650}>{address.line1}</Typography>
            {address.line2 && <Typography color="text.secondary">{address.line2}</Typography>}
            <Typography color="text.secondary">
              {address.city}, {address.state} {address.postalCode}
            </Typography>
            <Typography color="text.secondary">{address.country}</Typography>
          </Box>
        </Stack>
        <Stack direction="row">
          <Tooltip title="Edit address">
            <span>
              <IconButton aria-label={`Edit ${address.label}`} onClick={onEdit} disabled={actionsDisabled}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete address">
            <span>
              <IconButton
                aria-label={`Delete ${address.label}`}
                onClick={onDelete}
                disabled={actionsDisabled}
                color="error"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default function UserDetailPage() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [adding, setAdding] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [addressError, setAddressError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    api.getUser(userId, controller.signal)
      .then((data) => {
        setUser(data)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [reloadKey, userId])

  const retry = () => {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }

  const createAddress = async (values) => {
    const created = await api.createAddress(user.id, values)
    setUser((current) => ({
      ...current,
      addresses: [...current.addresses, created],
    }))
    setAdding(false)
  }

  const updateAddress = (addressId) => async (values) => {
    const updated = await api.updateAddress(user.id, addressId, values)
    setUser((current) => ({
      ...current,
      addresses: current.addresses.map((address) =>
        address.id === addressId ? updated : address,
      ),
    }))
    setEditingAddressId(null)
  }

  const deleteAddress = async () => {
    setDeleting(true)
    setAddressError('')
    try {
      await api.deleteAddress(user.id, deleteTarget.id)
      setUser((current) => ({
        ...current,
        addresses: current.addresses.filter((address) => address.id !== deleteTarget.id),
      }))
      setDeleteTarget(null)
    } catch (deleteError) {
      setAddressError(deleteError.message)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <Box className="center-state page-state">
        <CircularProgress size={32} />
        <Typography color="text.secondary">Loading user details…</Typography>
      </Box>
    )
  }

  if (error || !user) {
    return (
      <Box className="center-state page-state">
        <Typography variant="h5">Unable to load user</Typography>
        <Typography color="text.secondary">{error || 'User data is unavailable.'}</Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/" startIcon={<ArrowBackRoundedIcon />}>Users</Button>
          <Button variant="contained" onClick={retry}>Retry</Button>
        </Stack>
      </Box>
    )
  }

  const editorOpen = adding || editingAddressId !== null

  return (
    <Stack spacing={3}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" underline="hover" color="inherit">Users</Link>
        <Typography color="text.primary">{user.firstName} {user.lastName}</Typography>
      </Breadcrumbs>

      <Box className="detail-heading">
        <Box>
          <Typography variant="overline" color="primary" fontWeight={750}>User #{user.id}</Typography>
          <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
          <Typography color="text.secondary" mt={0.75}>{user.email}</Typography>
        </Box>
        <Button component={RouterLink} to="/" startIcon={<ArrowBackRoundedIcon />}>
          Back to users
        </Button>
      </Box>

      <ProfileSection user={user} onUpdated={setUser} />

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          gap={2}
          mb={2}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h5">Addresses</Typography>
              <Chip label={user.addresses.length} size="small" />
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Stored in the order shown below
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              setAdding(true)
              setAddressError('')
            }}
            disabled={editorOpen}
          >
            Add address
          </Button>
        </Stack>

        {addressError && <Alert severity="error" sx={{ mb: 2 }}>{addressError}</Alert>}

        <Stack spacing={2}>
          {adding && (
            <Paper variant="outlined" className="address-card editing">
              <Typography variant="subtitle1" fontWeight={750} mb={2.5}>New address</Typography>
              <AddressEditor onSave={createAddress} onCancel={() => setAdding(false)} />
            </Paper>
          )}

          {user.addresses.length === 0 && !adding ? (
            <Paper variant="outlined" className="empty-addresses">
              <HomeWorkOutlinedIcon className="empty-icon" />
              <Typography variant="h6">No addresses yet</Typography>
              <Typography color="text.secondary">
                Add this user&apos;s first delivery address.
              </Typography>
              <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => setAdding(true)}>
                Add address
              </Button>
            </Paper>
          ) : (
            user.addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isEditing={editingAddressId === address.id}
                actionsDisabled={editorOpen}
                onEdit={() => {
                  setEditingAddressId(address.id)
                  setAddressError('')
                }}
                onCancel={() => setEditingAddressId(null)}
                onSave={updateAddress(address.id)}
                onDelete={() => setDeleteTarget(address)}
              />
            ))
          )}
        </Stack>
      </Box>

      <Dialog open={Boolean(deleteTarget)} onClose={() => !deleting && setDeleteTarget(null)}>
        <DialogTitle>Delete address?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the {deleteTarget?.label} address from this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
          <Button color="error" variant="contained" onClick={deleteAddress} disabled={deleting}>
            {deleting ? <CircularProgress size={20} color="inherit" /> : 'Delete address'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
