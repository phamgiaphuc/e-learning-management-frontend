import { LessonProps } from "@/types/lesson";
import { v4 as uuidv4 } from "uuid";

export interface ModuleProps {
  id: string;
  name: string;
  lessons: Array<LessonProps>;
  sequence: number;
}

export const initialModule: ModuleProps = {
  id: uuidv4(),
  name: "Module name",
  lessons: [],
  sequence: 1,
};
