import { LessonDetailProps } from "@/types/lesson";
import { ModuleDetailProps } from "@/types/module";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";

interface CourseContentListProps {
  modules: (Pick<ModuleDetailProps, "name" | "id"> & {
    lessons: Array<Pick<LessonDetailProps, "id" | "name">>;
  })[];
}

interface CourseModuleTreeProps {
  module: Pick<ModuleDetailProps, "name" | "id"> & {
    lessons: Array<Pick<LessonDetailProps, "id" | "name">>;
  };
}

const CourseContentList = ({ modules }: CourseContentListProps) => {
  return (
    <div>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Menu size={20} /> Content of the course
        </Typography>
        <Stack gap={2}>
          {modules?.map((module) => (
            <CourseModuleTree key={module.id} module={module} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

const CourseModuleTree = ({ module }: CourseModuleTreeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        <Typography key={module.id} sx={{ fontWeight: 600, fontSize: 16 }}>
          {module.name}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Stack
          sx={{
            marginLeft: 3.5,
            marginTop: 1,
            gap: 1,
          }}
        >
          {module.lessons.map((lesson, index) => (
            <Typography key={lesson.id}>
              {index + 1}. {lesson.name}
            </Typography>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default CourseContentList;
