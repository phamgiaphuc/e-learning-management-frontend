import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import { StudentEnrolledCourse } from "@/types/student";
import axios from "axios";
import { createContext, useCallback } from "react";

export interface StudentContextProps {
  getStudentEnrollments: () => Promise<{
    courses: StudentEnrolledCourse[];
  }>;
}

export const StudentContext = createContext<StudentContextProps>({
  getStudentEnrollments: async () => ({
    courses: [],
  }),
});

const StudentProvider = ({ children }: ChildrenNodeProps) => {
  const getStudentEnrollments = useCallback(async () => {
    try {
      const {
        data: { courses },
      } = await axiosJwt.get("/students/my-learning");
      for (const data of courses) {
        const {
          data: { course },
        } = await axios.get(`/courses/${data.courseId}`);
        data.course = course;
      }
      return { courses };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <StudentContext.Provider value={{ getStudentEnrollments }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
