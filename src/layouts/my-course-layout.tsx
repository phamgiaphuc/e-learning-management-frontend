import { useAppSelector } from "@/hooks/use-app-selector";
import { Outlet, useNavigate } from "react-router-dom";

const MyCourseLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    navigate("/");
  }

  return <Outlet />;
};

export default MyCourseLayout;
