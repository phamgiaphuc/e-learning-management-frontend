import { Tooltip, useColorScheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";

const ThemeModeButton = () => {
  const { mode, setMode } = useColorScheme();

  const onModeClick = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [mode, setMode]);

  if (!mode) {
    return null;
  }

  return (
    <Tooltip
      title={mode === "light" ? "Turn off the light" : "Turn on the light"}
      arrow
    >
      <IconButton
        aria-label="mode"
        sx={{
          border: "solid",
          borderColor: "gray",
          "&:hover": {
            color: mode === "light" ? "black" : "white",
            borderColor: mode === "light" ? "black" : "white",
          },
        }}
        onClick={onModeClick}
      >
        {mode === "light" ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeButton;
