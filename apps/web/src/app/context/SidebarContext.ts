import { createContext } from "react";

export interface SidebarContextValue {
  isMobile: boolean;
  open: boolean;
  toggle: () => void;
  openSidebar: () => void;
  close: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);
