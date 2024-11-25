export interface LessonProps {
  id: number;
  name: string;
  lessons: Array<{ id: string; name: string }>;
  sequence: number;
}
