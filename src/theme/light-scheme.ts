import { grey } from "@/theme/color";
import { ColorSystemOptions } from "@mui/material";
import { blue } from "@mui/material/colors";
export const lightColorScheme: ColorSystemOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1B1E31",
    },
    background: {
      default: grey[50],
    },
    secondary: {
      main: blue[800],
    },
  },
};
