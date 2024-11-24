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
