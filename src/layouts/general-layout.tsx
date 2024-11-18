import AuthProvider from "@/contexts/auth-context";
import { BreakpointProvider } from "@/contexts/breakpoint-context";
import CourseProvider from "@/contexts/course-context";
import { ChildrenNodeProps } from "@/types/children";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <BreakpointProvider>
      <AuthProvider>
        <CourseProvider>{children}</CourseProvider>
      </AuthProvider>
    </BreakpointProvider>
  );
};

export default GeneralLayout;
