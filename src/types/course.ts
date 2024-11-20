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
  updatedAt: string | null | Date;
  createdAt: string | Date;
  deletedAt: string | null | Date;
}

export const inititialCourse: CourseProps = {
  id: "",
  description: "",
  isDeleted: false,
  name: "",
  numEnrollments: 0,
  numLessons: 0,
  slug: "",
  teacherId: "",
  thumbnailUrl: "",
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: new Date(),
};
