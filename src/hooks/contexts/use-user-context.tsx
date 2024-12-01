import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

export default useUserContext;
