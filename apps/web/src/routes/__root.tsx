import { createRootRoute, Outlet } from "@tanstack/react-router";
import CssBaseline from "@mui/material/CssBaseline";

const RootLayout= () => {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
}

export const Route = createRootRoute({
    component: RootLayout,
});