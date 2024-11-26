export interface LessonProps {
  id: string;
  name: string;
}
export interface LessonDetailsProps extends LessonProps {
  description: string;
  slug: string;
  //content: {};
}

export const initialLesson: LessonDetailsProps = {
  id: "",
  name: "",
  description: "",
  slug: "",
  //content: {},
};
