import useQuery from "@/hooks/use-query";
import LessonEditPage from "@/pages/my-course/teacher/lesson-edit";
import ModuleEditPage from "@/pages/my-course/teacher/module-edit";
import { useNavigate } from "react-router-dom";

const EditLayout = () => {
  const query = useQuery();
  const navigate = useNavigate();

  if (!query || !query.get) {
    navigate("/my-course");
    return null;
  }

  const type = query.get("type");

  return (
    <>
      {type === "module" && <ModuleEditPage />}
      {type === "lesson" && <LessonEditPage />}
    </>
  );
};

export default EditLayout;
