import { CourseContext } from "@/contexts/course-context";
import { useContext } from "react";

const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within an CourseProvider");
  }
  return context;
};

export default useCourseContext;
