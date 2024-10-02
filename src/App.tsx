import AuthLayout from "@/layouts/auth-layout";
import GeneralLayout from "@/layouts/general-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password-page";
import OtpVerificationPage from "@/pages/auth/otp-verification-page";
import SignInPage from "@/pages/auth/signin-page";
import SignUpPage from "@/pages/auth/signup-page";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="" />
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify" element={<OtpVerificationPage />} />
        </Route>
      </Routes>
    </GeneralLayout>
  );
};

export default App;
