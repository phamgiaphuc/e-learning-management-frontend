export interface ModuleProps {
  id: number;
  name: string;
  lessons: Array<{ id: string; name: string }>;
  sequence: number;
}

export const initialModule: ModuleProps = {
  id: 1,
  name: "Module 1",
  lessons: [],
  sequence: 1,
};
