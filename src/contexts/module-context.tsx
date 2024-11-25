import { axiosJwt } from "@/configs/axios.config";
import { initialModule, ModuleDetailsProps } from "@/types/module";
import { createContext, useCallback } from "react";
import { ChildrenNodeProps } from "@/types/children";

export interface ModuleContextProps {
  getModules: (id: string) => Promise<Array<ModuleDetailsProps>>;
  getModuleById: (id: string) => Promise<ModuleDetailsProps>;
}

export const ModuleContext = createContext<ModuleContextProps>({
  getModules: async () => [],
  getModuleById: async () => initialModule,
});

const ModuleProvider = ({ children }: ChildrenNodeProps) => {
  const getModules = useCallback(async (courseId: string) => {
    try {
      const {
        data: { modules },
      } = await axiosJwt.get(`/modules/many?courseId=${courseId}`);
      return modules;
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      throw error;
    }
  }, []);
  const getModuleById = useCallback(async (id: string) => {
    try {
      const {
        data: { module },
      } = await axiosJwt.get(`/modules/${id}`);
      return module;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <ModuleContext.Provider value={{ getModules, getModuleById }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
