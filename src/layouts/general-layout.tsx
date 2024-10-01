import { BreakpointProvider } from "@/contexts/breakpoint-context";
import { ChildrenNodeProps } from "@/types/children";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return <BreakpointProvider>{children}</BreakpointProvider>;
};

export default GeneralLayout;
