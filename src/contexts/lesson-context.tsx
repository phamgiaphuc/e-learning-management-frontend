import { axiosJwt } from "@/configs/axios.config";
import { ChildrenNodeProps } from "@/types/children";
import { initialLessonDetail, LessonDetailProps } from "@/types/lesson";
import { createContext, useCallback } from "react";

export interface LessonContextProps {
  createLesson: (
    data: Pick<
      LessonDetailProps,
      "name" | "moduleId" | "description" | "content"
    >,
  ) => Promise<LessonDetailProps>;
  getLessons: (id: string) => Promise<Array<LessonDetailProps>>;
  getLessonById: (id: string) => Promise<LessonDetailProps>;
}

export const LessonContext = createContext<LessonContextProps>({
  createLesson: async () => initialLessonDetail,
  getLessons: async () => [],
  getLessonById: async () => initialLessonDetail,
});

const LessonProvider = ({ children }: ChildrenNodeProps) => {
  const createLesson = useCallback(
    async (
      data: Pick<
        LessonDetailProps,
        "name" | "moduleId" | "description" | "content"
      >,
    ) => {
      try {
        const {
          data: { lesson },
        } = await axiosJwt.post("/lessons", data);
        return lesson;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [],
  );

  const getLessons = useCallback(async (moduleId: string) => {
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
  const getLessonById = useCallback(async (id: string) => {
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
    <LessonContext.Provider value={{ createLesson, getLessons, getLessonById }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;
