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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
