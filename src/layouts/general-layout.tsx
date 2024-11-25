import AuthProvider from "@/contexts/auth-context";
import { BreakpointProvider } from "@/contexts/breakpoint-context";
import CourseProvider from "@/contexts/course-context";
import ImageProvider from "@/contexts/image-context";
import ModuleProvider from "@/contexts/module-context";
import { ChildrenNodeProps } from "@/types/children";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <BreakpointProvider>
      <AuthProvider>
        <ImageProvider>
          <CourseProvider>
            <ModuleProvider>{children}</ModuleProvider>
          </CourseProvider>
        </ImageProvider>
      </AuthProvider>
    </BreakpointProvider>
  );
};

export default GeneralLayout;
