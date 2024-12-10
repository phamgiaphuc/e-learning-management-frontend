import { CourseDetailProps } from "@/types/course";
import { EnrollmentStatus } from "@/types/enrollment";

export interface StudentEnrolledCourse {
  cancelledAt: Date | string;
  completedLessonsIds: string[];
  completedModulesIds: string[];
  completion: number;
  courseId: string;
  enrolledAt: Date | string;
  grade: number;
  id: string;
  status: EnrollmentStatus;
  studentId: string;
  course?: CourseDetailProps;
}
