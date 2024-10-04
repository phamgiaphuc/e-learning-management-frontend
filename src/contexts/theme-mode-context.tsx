import { generateTheme } from "@/theme/theme";
import { ChildrenNodeProps } from "@/types/children";
import { Theme, ThemeProvider } from "@mui/material";
import { createContext, useCallback, useEffect, useState } from "react";

const ThemeModeKey = "theme-key";
export type ThemeMode = "light" | "dark";
type ThemeModeProviderProps = ChildrenNodeProps;
interface ThemeModeContextProps {
  themeMode: ThemeMode;
  toggleTheme: (value: ThemeMode) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextProps>({
  themeMode: "light",
  toggleTheme: () => {},
});

const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [theme, setTheme] = useState<Theme>(generateTheme("light"));

  const toggleTheme = useCallback((value: ThemeMode) => {
    setThemeMode(value);
    localStorage.setItem(ThemeModeKey, value);
  }, []);

  useEffect(() => {
    switch (themeMode) {
      case "light":
        setTheme(generateTheme("light"));
        break;
      case "dark":
        setTheme(generateTheme("dark"));
        break;
      default:
        setTheme(generateTheme("light"));
        break;
    }
  }, [themeMode]);

  useEffect(() => {
    const themeModeKey = localStorage.getItem(ThemeModeKey) as ThemeMode;
    if (!themeModeKey) {
      localStorage.setItem(ThemeModeKey, "light");
      return;
    }
    toggleTheme(themeModeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{
        themeMode,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
