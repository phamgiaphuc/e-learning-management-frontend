import SignInPage from "@/pages/auth/signin-page";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="signin" element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
