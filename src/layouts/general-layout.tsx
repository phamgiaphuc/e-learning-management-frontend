import AuthProvider from "@/contexts/auth-context";
import { BreakpointProvider } from "@/contexts/breakpoint-context";
import CourseProvider from "@/contexts/course-context";
import EnrollmentProvider from "@/contexts/enrollment-context";
import ImageProvider from "@/contexts/image-context";
import LessonProvider from "@/contexts/lesson-context";
import ModuleProvider from "@/contexts/module-context";
import StudentProvider from "@/contexts/student-context";
import TeacherProvider from "@/contexts/teacher-context";
import UserProvider from "@/contexts/user-context";
import { ChildrenNodeProps } from "@/types/children";

type GeneralLayoutProps = ChildrenNodeProps;

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <BreakpointProvider>
      <AuthProvider>
        <CourseProvider>
          <UserProvider>
            <TeacherProvider>
              <StudentProvider>
                <ImageProvider>
                  <EnrollmentProvider>
                    <ModuleProvider>
                      <LessonProvider>{children}</LessonProvider>
                    </ModuleProvider>
                  </EnrollmentProvider>
                </ImageProvider>
              </StudentProvider>
            </TeacherProvider>
          </UserProvider>
        </CourseProvider>
      </AuthProvider>
    </BreakpointProvider>
  );
};

export default GeneralLayout;
