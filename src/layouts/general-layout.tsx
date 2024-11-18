import AuthProvider from "@/contexts/auth-context";
import { BreakpointProvider } from "@/contexts/breakpoint-context";
import { ChildrenNodeProps } from "@/types/children";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <BreakpointProvider>
      <AuthProvider>{children}</AuthProvider>
    </BreakpointProvider>
  );
};

export default GeneralLayout;
