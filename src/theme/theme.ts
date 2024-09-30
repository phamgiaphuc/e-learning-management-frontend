import { darkColorScheme } from "@/theme/dark-scheme";
import { lightColorScheme } from "@/theme/light-scheme";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: darkColorScheme,
    light: lightColorScheme,
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
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
  },
});

export default theme;
