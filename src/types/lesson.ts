import { v4 as uuidv4 } from "uuid";

export interface LessonProps {
  id: string;
  name: string;
  content: string;
}

export const initialLesson: LessonProps = {
  id: uuidv4(),
  name: "Lesson name",
  content: "",
};

export interface LessonDetailProps extends LessonProps {
  position: number;
  description: string;
  moduleId: string;
}

export const initialLessonDetail: LessonDetailProps = {
  id: uuidv4(),
  name: "",
  content: "",
  position: 1,
  description: "",
  moduleId: "",
};
