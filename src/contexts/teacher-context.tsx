import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import { CourseProps } from "@/types/course";
import { AxiosHeaders } from "axios";
import { createContext, useCallback } from "react";

export interface TeacherContextProps {
  getTeacherCourses: () => Promise<Array<CourseProps>>;
}

export const TeacherContext = createContext<TeacherContextProps>({
  getTeacherCourses: async () => [],
});

const TeacherProvider = ({ children }: ChildrenNodeProps) => {
  const { errorToast } = useToast();

  const getTeacherCourses = useCallback(async () => {
    try {
      const {
        data: { courses },
      } = await axiosJwt.get("/teachers/my-courses");
      return courses;
    } catch (error) {
      if (error instanceof AxiosHeaders) {
        const code = error.code;
        if (code === "ERR_NETWORK") {
          errorToast("Network error");
        }
      }
      throw error;
    }
  }, [errorToast]);

  return (
    <TeacherContext.Provider value={{ getTeacherCourses }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;
