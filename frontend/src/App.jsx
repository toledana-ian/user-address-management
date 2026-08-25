import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import UserDetailPage from './UserDetailPage'
import UserListPage from './UserListPage'

function Shell({ children }) {
  return (
    <Box className="app-shell">
      <AppBar position="static" elevation={0} className="topbar">
        <Container maxWidth="lg">
          <Toolbar disableGutters className="toolbar">
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.25}
              className="brand"
            >
              <Box className="brand-mark">
                <LocationOnRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={750} lineHeight={1.1}>
                  Address Admin
                </Typography>
                <Typography variant="caption" className="brand-caption">
                  Customer operations
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" className="environment">
              Administration
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" maxWidth="lg" className="main-content">
        {children}
      </Container>
    </Box>
  )
}

function NotFoundPage() {
  return (
    <Box className="center-state">
      <Typography variant="h4" fontWeight={750}>Page not found</Typography>
      <Typography color="text.secondary">The page you requested does not exist.</Typography>
      <Button component={RouterLink} to="/" variant="contained">Return to users</Button>
    </Box>
  )
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:userId" element={<UserDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Shell>
  )
}
