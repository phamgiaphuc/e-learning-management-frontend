import { ModuleContext } from "@/contexts/module-context";
import { useContext } from "react";

const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("useModuleContext must be used within an ModuleProvider");
  }
  return context;
};

export default useModuleContext;
