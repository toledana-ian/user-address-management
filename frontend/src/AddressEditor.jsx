import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material'

const emptyAddress = {
  label: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
}

export default function AddressEditor({ initialValue, onSave, onCancel, submitLabel = 'Save address' }) {
  const [values, setValues] = useState(() => ({ ...emptyAddress, ...initialValue }))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const change = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setFieldErrors({})
    try {
      await onSave(values)
    } catch (saveError) {
      setError(saveError.message)
      setFieldErrors(saveError.fieldErrors || {})
      setSaving(false)
    }
  }

  return (
    <Box component="form" onSubmit={submit} className="editor-form">
      <Stack spacing={2.25}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Label"
          value={values.label}
          onChange={change('label')}
          error={Boolean(fieldErrors.label)}
          helperText={fieldErrors.label || 'For example, Home or Office'}
          required
          fullWidth
          autoFocus
          slotProps={{ htmlInput: { maxLength: 50 } }}
        />
        <TextField
          label="Address line 1"
          value={values.line1}
          onChange={change('line1')}
          error={Boolean(fieldErrors.line1)}
          helperText={fieldErrors.line1}
          required
          fullWidth
          slotProps={{ htmlInput: { maxLength: 200 } }}
        />
        <TextField
          label="Address line 2"
          value={values.line2 || ''}
          onChange={change('line2')}
          error={Boolean(fieldErrors.line2)}
          helperText={fieldErrors.line2 || 'Optional'}
          fullWidth
          slotProps={{ htmlInput: { maxLength: 200 } }}
        />
        <Box className="address-grid">
          <TextField
            label="City"
            value={values.city}
            onChange={change('city')}
            error={Boolean(fieldErrors.city)}
            helperText={fieldErrors.city}
            required
            fullWidth
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />
          <TextField
            label="State / region"
            value={values.state}
            onChange={change('state')}
            error={Boolean(fieldErrors.state)}
            helperText={fieldErrors.state}
            required
            fullWidth
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />
          <TextField
            label="Postal code"
            value={values.postalCode}
            onChange={change('postalCode')}
            error={Boolean(fieldErrors.postalCode)}
            helperText={fieldErrors.postalCode}
            required
            fullWidth
            slotProps={{ htmlInput: { maxLength: 20 } }}
          />
          <TextField
            label="Country"
            value={values.country}
            onChange={change('country')}
            error={Boolean(fieldErrors.country)}
            helperText={fieldErrors.country}
            required
            fullWidth
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button onClick={onCancel} disabled={saving}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={20} color="inherit" /> : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
