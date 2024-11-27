import AuthLayout from "@/layouts/auth-layout";
import GeneralLayout from "@/layouts/general-layout";
import HomeLayout from "@/layouts/home-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import OtpVerificationPage from "@/pages/auth/otp-verification-page";
import RecoverPasswordPage from "@/pages/auth/recover-password-page";
import SignInPage from "@/pages/auth/signin-page";
import SignUpPage from "@/pages/auth/signup-page";
import MyCoursePage from "@/pages/home/my-course-page";
import NotFoundPage from "@/pages/other/not-found-page";
import { Route, Routes } from "react-router-dom";
import SignOutPage from "@/pages/auth/signout-page";
import HomePage from "@/pages/home/home-page";
import CourseAddPage from "@/pages/my-course/teacher/course-add";
import MyCourseLayout from "@/layouts/my-course-layout";
import PreviewLayout from "@/layouts/preview-layout";
import EditLayout from "@/layouts/edit-layout";
import CourseDetailPage from "@/pages/course/course-detail-page";
import CourseContent from "@/pages/course/course-content";

const App = () => {
  return (
    <GeneralLayout>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="my-course" element={<MyCourseLayout />}>
            <Route index element={<MyCoursePage />} />
            {/** Teacher */}
            <Route path="add-course" element={<CourseAddPage />} />
            <Route path="preview" element={<PreviewLayout />} />
            <Route path="edit" element={<EditLayout />} />
          </Route>
          <Route path="signout" element={<SignOutPage />} />
          <Route path="course">
            <Route path=":id" element={<CourseDetailPage />} />
            <Route path=":id/content" element={<CourseContent />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="recover-password" element={<RecoverPasswordPage />} />
          <Route path="verify" element={<OtpVerificationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </GeneralLayout>
  );
};

export default App;
