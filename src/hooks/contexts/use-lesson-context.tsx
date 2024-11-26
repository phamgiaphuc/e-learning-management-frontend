import { LessonContext } from "@/contexts/lesson-context";
import { useContext } from "react";

const useLessonContext = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within an LessonProvider");
  }
  return context;
};

export default useLessonContext;
