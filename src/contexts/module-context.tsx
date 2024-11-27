import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import { initialModuleDetail, ModuleDetailProps } from "@/types/module";
import { createContext, useCallback } from "react";

export interface ModuleContextProps {
  createModule: (
    data: Pick<ModuleDetailProps, "name" | "courseId" | "description">,
  ) => Promise<ModuleDetailProps>;
  getModules: (id: string) => Promise<Array<ModuleDetailProps>>;
  getModuleById: (id: string) => Promise<ModuleDetailProps>;
}

export const ModuleContext = createContext<ModuleContextProps>({
  createModule: async () => initialModuleDetail,
  getModules: async () => [],
  getModuleById: async () => initialModuleDetail,
});

const ModuleProvider = ({ children }: ChildrenNodeProps) => {
  const createModule = useCallback(
    async (
      data: Pick<ModuleDetailProps, "name" | "courseId" | "description">,
    ) => {
      try {
        const {
          data: { module },
        } = await axiosJwt.post("/modules", data);
        return module;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

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
    <ModuleContext.Provider value={{ createModule, getModules, getModuleById }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
