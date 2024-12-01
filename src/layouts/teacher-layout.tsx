import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLayout = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (!["teacher", "admin"].includes(user?.role || "")) {
      navigate("/my-course");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return <div>TeacherLayout</div>;
};

export default TeacherLayout;
