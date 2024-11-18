import { useAppSelector } from "@/hooks/use-app-selector";
import { ChildrenNodeProps } from "@/types/children";
import { CourseProps, intitialCourseValues } from "@/types/course";
import axios from "axios";
import { createContext, useCallback } from "react";

export interface CourseContextProps {
  getCourses: () => Promise<Array<CourseProps>>;
  getCourseById: (id: string) => Promise<CourseProps>;
}

export const CourseContext = createContext<CourseContextProps>({
  getCourses: async () => [],
  getCourseById: async () => intitialCourseValues,
});

const CourseProvider = ({ children }: ChildrenNodeProps) => {
  const { data } = useAppSelector((state) => state.auth);

  const getCourses = useCallback(async () => {
    try {
      const {
        data: { courses },
      } = await axios.get("/courses/many");
      return courses;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const getCourseById = useCallback(
    async (id: string) => {
      try {
        const {
          data: { course },
        } = await axios.get(`/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${data?.tokens?.accessToken}`,
          },
        });
        return course;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [data?.tokens?.accessToken],
  );

  return (
    <CourseContext.Provider value={{ getCourses, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
