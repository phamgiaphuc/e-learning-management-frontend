import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import {
  CourseDetailProps,
  CourseProps,
  GetCourseByIdProps,
  initialGetCourseById,
  initialCourse,
} from "@/types/course";
import axios, { AxiosError } from "axios";
import { createContext, useCallback } from "react";

export interface CourseContextProps {
  createCourse: (
    data: Pick<
      CourseProps,
      "name" | "description" | "level" | "thumbnailUrl" | "teacherId"
    >,
  ) => Promise<CourseDetailProps>;
  getCourses: () => Promise<Array<CourseDetailProps>>;
  getCourseById: (id: string) => Promise<GetCourseByIdProps>;
}

export const CourseContext = createContext<CourseContextProps>({
  createCourse: async () => initialCourse,
  getCourses: async () => [],
  getCourseById: async () => initialGetCourseById,
});

const CourseProvider = ({ children }: ChildrenNodeProps) => {
  const { errorToast } = useToast();

  const createCourse = useCallback(
    async (
      data: Pick<
        CourseProps,
        "name" | "description" | "level" | "thumbnailUrl" | "teacherId"
      >,
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
      if (error instanceof AxiosError) {
        const code = error.code;
        if (code === "ERR_NETWORK") {
          errorToast("Network error");
        }
      }
      throw error;
    }
  }, [errorToast]);

  const getCourseById = useCallback(async (id: string) => {
    try {
      const {
        data: { course, modules },
      } = await axiosJwt.get(`/courses/${id}`);
      return {
        course,
        modules,
      };
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
