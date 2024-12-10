export type EnrollmentStatus = "COMPLETED" | "IN_PROGRESS" | "CANCELLED";

export const enrollmentStatus: Record<EnrollmentStatus, string> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In progress",
  CANCELLED: "Canceled",
};
