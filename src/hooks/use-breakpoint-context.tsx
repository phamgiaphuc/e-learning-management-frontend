import { BreakpointContext } from "@/contexts/breakpoint-context";
import { useContext } from "react";

const useBreakpointContext = () => {
  const context = useContext(BreakpointContext);
  if (context === null) {
    throw new Error(
      "useBreakpointContext must be used within a BreakpointProvider",
    );
  }
  return context;
};

export default useBreakpointContext;
