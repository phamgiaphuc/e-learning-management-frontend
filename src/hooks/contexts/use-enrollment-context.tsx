import { EnrollmentContext } from "@/contexts/enrollment-context";
import { useContext } from "react";

const useEnrollmentContext = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error(
      "useEnrollmentContext must be used within an EnrollmentProvider",
    );
  }
  return context;
};

export default useEnrollmentContext;
