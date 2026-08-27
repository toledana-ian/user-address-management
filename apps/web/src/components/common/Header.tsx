import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSidebar } from "../../hooks/useSidebar";
import { SIDEBAR_WIDTH } from "./Sidebar";

const Header = () => {
  const { isMobile, open, toggle } = useSidebar();
  const shifted = !isMobile && open;

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        width: shifted ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
        ml: shifted ? `${SIDEBAR_WIDTH}px` : 0,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: shifted
              ? theme.transitions.easing.easeOut
              : theme.transitions.easing.sharp,
            duration: shifted
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          aria-label="Toggle sidebar"
          onClick={toggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 1.5,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <PeopleAltIcon fontSize="small" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700 }}
          >
            User Management
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
