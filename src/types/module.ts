import { LessonProps } from "@/types/lesson";
import { v4 as uuidv4 } from "uuid";

export interface ModuleProps {
  id: string;
  name: string;
  lessons: Array<LessonProps>;
  description: string;
  position: number;
}

export const initialModule: ModuleProps = {
  id: uuidv4(),
  name: "Module name",
  lessons: [],
  position: 1,
  description: "",
};

export interface ModuleDetailProps extends Omit<ModuleProps, "lessons"> {
  courseId: string;
  description: string;
  numLessons: number;
}

export const initialModuleDetail: ModuleDetailProps = {
  id: uuidv4(),
  name: "",
  position: 1,
  courseId: "",
  description: "",
  numLessons: 0,
};

export interface ModuleDetailsProps extends ModuleProps {
  slug: string;
  description: string;
  updatedAt: string | null | Date;
  createdAt: string | Date;
}
