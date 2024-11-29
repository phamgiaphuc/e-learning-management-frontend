import { axiosJwt } from "@/configs/axios.config";
import useToast from "@/hooks/use-toast";
import { ChildrenNodeProps } from "@/types/children";
import { createContext, useCallback } from "react";

export interface EnrollmentContextProps {
  createEnrollment: (id: string) => Promise<void>;
}

export const EnrollmentContext = createContext<EnrollmentContextProps>({
  createEnrollment: async () => {},
});

const EnrollmentProvider = ({ children }: ChildrenNodeProps) => {
  const { successToast } = useToast();

  const createEnrollment = useCallback(
    async (id: string) => {
      try {
        const { data } = await axiosJwt.post("/enrollments", {
          courseId: id,
        });
        console.log(data);
        successToast("Join course successfully");
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [successToast],
  );

  return (
    <EnrollmentContext.Provider value={{ createEnrollment }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export default EnrollmentProvider;
