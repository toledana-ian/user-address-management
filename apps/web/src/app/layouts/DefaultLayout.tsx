import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "@tanstack/react-router";
import Header from "../../components/common/Header";
import Sidebar, { SIDEBAR_WIDTH } from "../../components/common/Sidebar";
import { SidebarProvider, useSidebar } from "../../hooks/useSidebar";

const DefaultLayoutContent = () => {
  const { isMobile, open } = useSidebar();
  const shifted = !isMobile && open;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMobile || shifted ? 0 : `-${SIDEBAR_WIDTH}px`,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: shifted
                ? theme.transitions.easing.easeOut
                : theme.transitions.easing.sharp,
              duration: shifted
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

const DefaultLayout = () => (
  <SidebarProvider>
    <DefaultLayoutContent />
  </SidebarProvider>
);

export default DefaultLayout;
