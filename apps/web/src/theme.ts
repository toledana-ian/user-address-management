import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand: {
      tint: string;
      tint2: string;
      link: string;
    };
  }
  interface PaletteOptions {
    brand?: {
      tint: string;
      tint2: string;
      link: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#17A2A2",
      dark: "#0F8B8B",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7F9",
      paper: "#FFFFFF",
    },
    divider: "#E6EAEF",
    text: {
      primary: "#111826",
      secondary: "#5A6474",
      disabled: "#8C95A3",
    },
    brand: {
      tint: "#E9F7F7",
      tint2: "#D3EFEF",
      link: "#0C7373",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.brand.link,
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.brand.tint,
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.brand.tint2,
            "&:hover": {
              backgroundColor: theme.palette.brand.tint2,
            },
            "& .MuiListItemIcon-root": {
              color: theme.palette.brand.link,
            },
            "& .MuiListItemText-primary": {
              color: theme.palette.brand.link,
            },
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.brand.tint,
          color: theme.palette.brand.link,
        }),
      },
    },
  },
});
