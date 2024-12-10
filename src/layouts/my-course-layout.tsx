import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MyCourseLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default MyCourseLayout;
