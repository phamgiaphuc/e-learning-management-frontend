import { TeacherContext } from "@/contexts/teacher-context";
import { useContext } from "react";

const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacherContext must be used within an TeacherProvider");
  }
  return context;
};

export default useTeacherContext;
