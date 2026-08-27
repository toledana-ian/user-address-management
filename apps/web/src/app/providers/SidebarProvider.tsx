import { useCallback, useMemo, useState, type ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SidebarContext } from "../context/SidebarContext";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);

  if (isMobile !== prevIsMobile) {
    setPrevIsMobile(isMobile);
    setOpen(!isMobile);
  }

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ isMobile, open, toggle, openSidebar, close }),
    [isMobile, open, toggle, openSidebar, close],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
