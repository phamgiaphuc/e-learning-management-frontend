import { NewCourseProps } from "@/types/course";
import { initialModule, ModuleProps } from "@/types/module";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface CourseStateProps {
  course?: NewCourseProps;
  modules?: Array<ModuleProps>;
}

const initialState: CourseStateProps = {
  course: undefined,
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
        level: "beginner",
        slug: "Unlock Your Potential: Explore New Skills and Knowledge Today!",
      };
      state.modules = [initialModule];
    },
    setThumbnailUrl: (state, action: PayloadAction<string>) => {
      if (state.course) {
        state.course.thumbnailUrl = action.payload;
      }
    },
    updateCourse: (state, action: PayloadAction<NewCourseProps>) => {
      state.course = action.payload;
    },
    updateModule: (state, action: PayloadAction<ModuleProps[]>) => {
      state.modules = action.payload;
    },
    deleteModule: (state, action: PayloadAction<number>) => {
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
  resetCourse,
  updateCourse,
  updateModule,
} = courseSlice.actions;

export default courseSlice.reducer;
