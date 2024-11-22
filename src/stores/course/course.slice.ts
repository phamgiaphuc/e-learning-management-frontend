import { NewCourseProps } from "@/types/course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseStateProps {
  course?: NewCourseProps;
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
        thumbnailUrl: "",
        level: "beginner",
        slug: "Unlock Your Potential: Explore New Skills and Knowledge Today!",
      };
    },
    updateCourse: (state, action: PayloadAction<NewCourseProps>) => {
      state.course = action.payload;
    },
    resetCourse: () => initialState,
  },
});

export const { setBaseCourse, resetCourse, updateCourse } = courseSlice.actions;

export default courseSlice.reducer;
