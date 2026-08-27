import Box from "@mui/material/Box";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../../components/common/Sidebar";

const DefaultLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
