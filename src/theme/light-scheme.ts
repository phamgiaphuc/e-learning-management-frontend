import { grey } from "@/theme/color";
import { ColorSystemOptions } from "@mui/material";
export const lightColorScheme: ColorSystemOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1B1E31",
    },
    text: {
      primary: "#1575E3",
      secondary: "#C7CACD",
    },
    background: {
      default: grey[50],
    },
  },
};
