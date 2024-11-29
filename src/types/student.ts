export interface StudentEnrolledCourse {
  cancelledAt: Date | string;
  completedLessonsIds: string[];
  completedModulesIds: string[];
  completion: number;
  courseId: string;
  enrolledAt: Date | string;
  grade: number;
  id: string;
  status: string;
  studentId: string;
}
