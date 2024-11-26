import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import { initialModuleDetail, ModuleDetailProps } from "@/types/module";
import { createContext, useCallback } from "react";

export interface ModuleContextProps {
  createModule: (
    data: Pick<ModuleDetailProps, "name" | "courseId" | "description">,
  ) => Promise<ModuleDetailProps>;
}

export const ModuleContext = createContext<ModuleContextProps>({
  createModule: async () => initialModuleDetail,
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

  return (
    <ModuleContext.Provider value={{ createModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
