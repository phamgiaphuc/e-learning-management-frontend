import { axiosJwt } from "@/configs/axios.config";
import { initialLesson, LessonDetailsProps } from "@/types/lesson";
import { createContext, useCallback } from "react";
import { ChildrenNodeProps } from "@/types/children";

export interface LessonContextProps {
  getLessons: (id: number) => Promise<Array<LessonDetailsProps>>;
  getLessonById: (id: number) => Promise<LessonDetailsProps>;
}

export const LessonContext = createContext<LessonContextProps>({
  getLessons: async () => [],
  getLessonById: async () => initialLesson,
});

const LessonProvider = ({ children }: ChildrenNodeProps) => {
  const getLessons = useCallback(async (moduleId: number) => {
    try {
      const {
        data: { lessons },
      } = await axiosJwt.get(`/lessons/many?moduleId=${moduleId}`);
      return lessons;
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
      throw error;
    }
  }, []);
  const getLessonById = useCallback(async (id: number) => {
    try {
      const {
        data: { lesson },
      } = await axiosJwt.get(`/lessons/${id}`);
      return lesson;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <LessonContext.Provider value={{ getLessons, getLessonById }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;
