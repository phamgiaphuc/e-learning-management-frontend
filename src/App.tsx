import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dasboard-layout";
import GeneralLayout from "@/layouts/general-layout";
import HomeLayout from "@/layouts/home-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import OtpVerificationPage from "@/pages/auth/otp-verification-page";
import RecoverPasswordPage from "@/pages/auth/recover-password-page";
import SignInPage from "@/pages/auth/signin-page";
import SignUpPage from "@/pages/auth/signup-page";
import BlogsPage from "@/pages/dashboard/blogs-page";
import CommunitiesPage from "@/pages/dashboard/communities-page";
import CoursesPage from "@/pages/dashboard/courses-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import HomePage from "@/pages/home/home-page";
import MyCoursePage from "@/pages/home/my-course-page";
import NotFoundPage from "@/pages/other/not-found-page";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/defalut-home";
import LoginHome from "./pages/home/login-home";

const App = () => {
  return (
    <GeneralLayout>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-course" element={<MyCoursePage />} />
          <Route path="home" element={<Home />} />
          <Route path="login-home" element={<LoginHome />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="recover-password" element={<RecoverPasswordPage />} />
          <Route path="verify" element={<OtpVerificationPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="communities" element={<CommunitiesPage />} />
          <Route path="blogs" element={<BlogsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </GeneralLayout>
  );
};

export default App;
