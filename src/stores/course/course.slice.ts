import { NewCourseProps } from "@/types/course";
import { LessonProps } from "@/types/lesson";
import { initialModule, ModuleProps } from "@/types/module";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface CourseStateProps {
  course?: NewCourseProps;
  modules?: Array<ModuleProps>;
  isChange?: boolean;
}

const initialState: CourseStateProps = {
  course: undefined,
  modules: undefined,
  isChange: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setBaseCourse: (
      state,
      action: PayloadAction<Pick<NewCourseProps, "name" | "description">>,
    ) => {
      state.course = {
        ...action.payload,
        id: uuidv4(),
        thumbnailUrl: "",
        level: "BEGINNER",
      };
      state.modules = [initialModule];
    },
    setThumbnailUrl: (state, action: PayloadAction<string>) => {
      if (state.course) {
        state.course.thumbnailUrl = action.payload;
      }
    },
    setIsChange: (state, action: PayloadAction<boolean>) => {
      state.isChange = action.payload;
    },
    updateCourse: (state, action: PayloadAction<NewCourseProps>) => {
      state.course = action.payload;
    },
    updateModule: (state, action: PayloadAction<ModuleProps[]>) => {
      state.modules = action.payload;
    },
    updateLesson: (
      state,
      action: PayloadAction<{
        lesson_id: string;
        module_id: string;
        lesson: LessonProps;
      }>,
    ) => {
      state.modules = state.modules?.map((module) => {
        if (module.id === action.payload.module_id) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) => {
              if (lesson.id === action.payload.lesson_id) {
                return action.payload.lesson;
              }
              return lesson;
            }),
          };
        }
        return module;
      });
    },
    updateModuleById: (
      state,
      action: PayloadAction<{ id: string; module: ModuleProps }>,
    ) => {
      state.modules = state.modules?.map((module) => {
        if (module.id === action.payload.id) {
          return action.payload.module;
        }
        return module;
      });
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules?.filter(
        (module) => module.id !== action.payload,
      );
    },
    resetCourse: (state) => {
      state.course = undefined;
      state.modules = undefined;
    },
  },
});

export const {
  setBaseCourse,
  setThumbnailUrl,
  setIsChange,
  resetCourse,
  updateCourse,
  updateModuleById,
  updateModule,
  updateLesson,
} = courseSlice.actions;

export default courseSlice.reducer;
