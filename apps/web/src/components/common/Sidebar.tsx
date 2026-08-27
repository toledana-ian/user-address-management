import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { useSidebar } from "../../hooks/useSidebar";

export const SIDEBAR_WIDTH = 260;

const navItems = [{ label: "Users", to: "/", icon: <PeopleAltIcon /> }];

const NavList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const matchRoute = useMatchRoute();

  return (
    <List sx={{ width: SIDEBAR_WIDTH }}>
      {navItems.map((item) => (
        <ListItemButton
          key={item.to}
          component={Link}
          to={item.to}
          selected={!!matchRoute({ to: item.to, fuzzy: false })}
          onClick={onNavigate}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

const Sidebar = () => {
  const { isMobile, open, close } = useSidebar();

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={close}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <NavList onNavigate={close} />
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: open ? SIDEBAR_WIDTH : 0,
        flexShrink: 0,
        overflow: "hidden",
        borderRight: open ? 1 : 0,
        borderColor: "divider",
        transition: (theme) =>
          theme.transitions.create(["width", "border-color"], {
            easing: open
              ? theme.transitions.easing.easeOut
              : theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <NavList />
    </Box>
  );
};

export default Sidebar;
