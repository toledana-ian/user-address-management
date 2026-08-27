import Box from "@mui/material/Box";
import { Outlet } from "@tanstack/react-router";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { SidebarProvider } from "../providers/SidebarProvider";

const DefaultLayout = () => {
  return (
    <SidebarProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ display: "flex", flex: 1, minWidth: 0 }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
};

export default DefaultLayout;
