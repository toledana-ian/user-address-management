import { createRootRoute, Outlet } from "@tanstack/react-router";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

const RootLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
});
