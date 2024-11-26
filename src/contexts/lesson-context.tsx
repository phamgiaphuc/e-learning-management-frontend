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
}

export const LessonContext = createContext<LessonContextProps>({
  createLesson: async () => initialLessonDetail,
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

  return (
    <LessonContext.Provider value={{ createLesson }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonProvider;
