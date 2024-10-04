import useThemeModeContext from "@/hooks/use-theme-mode-context";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";

const ThemeModeButton = () => {
  const { themeMode, toggleTheme } = useThemeModeContext();

  const onModeClick = useCallback(() => {
    if (themeMode === "light") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }, [themeMode, toggleTheme]);

  if (!themeMode) {
    return null;
  }

  return (
    <Tooltip
      title={themeMode === "light" ? "Turn off the light" : "Turn on the light"}
      arrow
    >
      <IconButton
        aria-label="mode"
        onClick={onModeClick}
        sx={{
          color: "primary.main",
        }}
      >
        {themeMode === "light" ? <Sun /> : <Moon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeButton;
