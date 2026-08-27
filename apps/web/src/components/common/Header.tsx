import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useSidebar } from "../../hooks/useSidebar";

const Header = () => {
  const { toggle } = useSidebar();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        width: "100%",
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
