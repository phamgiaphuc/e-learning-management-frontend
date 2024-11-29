import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import { StudentEnrolledCourse } from "@/types/student";
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
