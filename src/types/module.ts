import { LessonProps } from "./lesson";

export interface ModuleProps {
  id: number;
  name: string;
  lessons: Array<{ LessonProps: LessonProps }>;
  sequence: number;
}

export const initialModule: ModuleDetailsProps = {
  id: 1,
  // name: "Module 1",
  name: "",
  lessons: [],
  sequence: 1,
  slug: "",
  description: "",
  updatedAt: new Date(),
  createdAt: new Date(),
};

export interface ModuleDetailsProps extends ModuleProps {
  slug: string;
  description: string;
  updatedAt: string | null | Date;
  createdAt: string | Date;
}
