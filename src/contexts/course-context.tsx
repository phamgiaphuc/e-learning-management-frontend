import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import {
  CourseDetailProps,
  CourseProps,
  inititialCourse,
} from "@/types/course";
import axios from "axios";
import { createContext, useCallback } from "react";

export interface CourseContextProps {
  createCourse: (
    data: Pick<CourseProps, "name" | "description" | "level" | "teacherId">,
  ) => Promise<CourseDetailProps>;
  getCourses: () => Promise<Array<CourseDetailProps>>;
  getCourseById: (id: string) => Promise<CourseDetailProps>;
}

export const CourseContext = createContext<CourseContextProps>({
  createCourse: async () => inititialCourse,
  getCourses: async () => [],
  getCourseById: async () => inititialCourse,
});

const CourseProvider = ({ children }: ChildrenNodeProps) => {
  const createCourse = useCallback(
    async (
      data: Pick<CourseProps, "name" | "description" | "level" | "teacherId">,
    ) => {
      try {
        const {
          data: { course },
        } = await axiosJwt.post("/courses", data);
        return course;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

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

  const getCourseById = useCallback(async (id: string) => {
    try {
      const {
        data: { course },
      } = await axiosJwt.get(`/courses/${id}`);
      return course;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <CourseContext.Provider value={{ createCourse, getCourses, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
