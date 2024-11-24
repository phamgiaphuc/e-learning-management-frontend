import useQuery from "@/hooks/use-query";
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

  return <>{type === "module" && <ModuleEditPage />}</>;
};

export default EditLayout;
