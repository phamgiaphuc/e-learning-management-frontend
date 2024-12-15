import { zinc } from "@/theme/tailwind-color";
import { ColorSystemOptions } from "@mui/material";

export const darkColorScheme: ColorSystemOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: zinc[900],
    },
  },
};
