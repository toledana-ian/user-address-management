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

const Sidebar = () => {
  const matchRoute = useMatchRoute();
  const { isMobile, open, close } = useSidebar();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={close}
      ModalProps={isMobile ? { keepMounted: true } : undefined}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={!!matchRoute({ to: item.to, fuzzy: false })}
            onClick={isMobile ? close : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
