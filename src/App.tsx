import AuthLayout from "@/layouts/auth-layout";
import GeneralLayout from "@/layouts/general-layout";
import SignInPage from "@/pages/auth/signin-page";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="" />
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </GeneralLayout>
  );
};

export default App;
