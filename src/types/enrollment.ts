type Status = "Complete" | "In progress" | "Not enroll";

export interface EnrollmentProps {
  id: string;
  studentId?: string;
  courseId: string;
  status: Status;
}
