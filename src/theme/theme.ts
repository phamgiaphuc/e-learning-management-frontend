import { ThemeMode } from "@/contexts/theme-mode-context";
import { darkColorScheme } from "@/theme/dark-scheme";
import { lightColorScheme } from "@/theme/light-scheme";
import { createTheme } from "@mui/material/styles";

export const generateTheme = (theme: ThemeMode) =>
  createTheme({
    ...(theme === "light" ? lightColorScheme : darkColorScheme),
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "12px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "12px",
              },
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: 16,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 14,
          },
        },
      },
    },
  });
