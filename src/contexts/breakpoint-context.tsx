import { ChildrenNodeProps } from "@/types/children";
import { useMediaQuery, useTheme } from "@mui/material";
import { createContext } from "react";

interface BreakpointContextProps {
  isMobileView: boolean;
  isTabletView: boolean;
  isSmallLaptopView: boolean;
  isLargeLaptopView: boolean;
}

type BreakpointProviderProps = ChildrenNodeProps;

export const BreakpointContext = createContext<BreakpointContextProps>({
  isMobileView: false,
  isTabletView: false,
  isSmallLaptopView: false,
  isLargeLaptopView: false,
});

export const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const isTabletView = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const isSmallLaptopView = useMediaQuery(
    theme.breakpoints.between("xl", "2xl"),
  );
  const isLargeLaptopView = useMediaQuery(theme.breakpoints.up("2xl"));

  return (
    <BreakpointContext.Provider
      value={{
        isMobileView,
        isTabletView,
        isSmallLaptopView,
        isLargeLaptopView,
      }}
    >
      {children}
    </BreakpointContext.Provider>
  );
};
