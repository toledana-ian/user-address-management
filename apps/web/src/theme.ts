import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

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

  interface TypographyVariants {
    pageTitle: CSSProperties;
    section: CSSProperties;
    label: CSSProperties;
    micro: CSSProperties;
    metric: CSSProperties;
  }
  interface TypographyVariantsOptions {
    pageTitle?: CSSProperties;
    section?: CSSProperties;
    label?: CSSProperties;
    micro?: CSSProperties;
    metric?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    pageTitle: true;
    section: true;
    label: true;
    micro: true;
    metric: true;
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
  typography: {
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: "18px",
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 700,
    },
    section: {
      fontSize: 15,
      fontWeight: 600,
    },
    label: {
      fontSize: 12.5,
      fontWeight: 600,
    },
    micro: {
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    metric: {
      fontSize: 26,
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          pageTitle: "h1",
          section: "h2",
          label: "span",
          micro: "span",
          metric: "div",
        },
      },
    },
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
