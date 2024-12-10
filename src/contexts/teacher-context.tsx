import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import { CourseDetailProps } from "@/types/course";
import { AxiosHeaders } from "axios";
import { createContext, useCallback, useState } from "react";

export interface TeacherContextProps {
  getTeacherCourses: () => Promise<Array<CourseDetailProps>>;
  loading: boolean;
}

export const TeacherContext = createContext<TeacherContextProps>({
  getTeacherCourses: async () => [],
  loading: false,
});

const TeacherProvider = ({ children }: ChildrenNodeProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorToast } = useToast();

  const getTeacherCourses = useCallback(async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [errorToast]);

  return (
    <TeacherContext.Provider value={{ getTeacherCourses, loading }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;
