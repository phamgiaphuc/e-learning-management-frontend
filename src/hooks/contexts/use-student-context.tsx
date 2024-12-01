import { StudentContext } from "@/contexts/student-context";
import { useContext } from "react";

const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within an StudentProvider");
  }
  return context;
};

export default useStudentContext;
