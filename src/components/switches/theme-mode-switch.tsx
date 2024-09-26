import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";
import { Laptop, Moon, Sun } from "lucide-react";

const ThemeModeSwitch = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <>
      <FormControl
        sx={{
          maxWidth: 140,
        }}
      >
        <InputLabel>Mode</InputLabel>
        <Select
          value={mode}
          label="Mode"
          onChange={(event) => {
            setMode(event.target.value as "light" | "dark" | "system");
          }}
        >
          <MenuItem value="light">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sun size={20} /> Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Moon size={20} /> Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Laptop size={20} /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ThemeModeSwitch;
