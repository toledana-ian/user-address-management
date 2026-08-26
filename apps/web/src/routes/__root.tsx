import { createRootRoute, Outlet } from "@tanstack/react-router";
import CssBaseline from "@mui/material/CssBaseline";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
}
