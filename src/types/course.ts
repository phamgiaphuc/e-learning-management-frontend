import * as yup from "yup";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface CourseProps {
  id: string;
  description: string;
  isDeleted: boolean;
  name: string;
  numEnrollments: number;
  numLessons: number;
  slug: string;
  teacherId: string;
  thumbnailUrl: string;
  rating: number;
  level: Level;
}

export interface NewCourseProps
  extends Pick<
    CourseProps,
    "id" | "name" | "description" | "thumbnailUrl" | "level"
  > {}

export interface CourseDetailProps extends CourseProps {
  updatedAt: string | null | Date;
  createdAt: string | Date;
  deletedAt: string | null | Date;
}

export const newCourseSchema = yup.object<NewCourseProps>({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  level: yup.string().required("Level is required"),
});

export const initialNewCourse: NewCourseProps = {
  name: "",
  description: "",
  thumbnailUrl: "",
  level: "BEGINNER",
  id: "",
};

export const inititialCourse: CourseDetailProps = {
  id: "",
  description: "",
  isDeleted: false,
  name: "",
  numEnrollments: 0,
  numLessons: 0,
  slug: "",
  teacherId: "",
  thumbnailUrl: "",
  rating: 0,
  level: "BEGINNER",
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: new Date(),
};
