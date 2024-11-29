import { ThemeModeContext } from "@/contexts/theme-mode-context";
import { useContext } from "react";

const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext);
  if (context === null) {
    throw new Error(
      "useThemeModeContext must be used within a ThemeModeProvider",
    );
  }
  return context;
};

export default useThemeModeContext;
