import { BreakpointProvider } from "@/contexts/breakpoint-context";
import { ChildrenNodeProps } from "@/types/children";
import { useEffect } from "react";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  useEffect(() => {
    console.log("ABC");
  }, []);
  return <BreakpointProvider>{children}</BreakpointProvider>;
};

export default GeneralLayout;
