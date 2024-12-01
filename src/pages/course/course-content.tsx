import useCourseContext from "@/hooks/contexts/use-course-context";
import CourseAssignment from "@/sections/course/content/course-assignment";
import CourseContentMain from "@/sections/course/content/course-content-main";
import CourseInfo from "@/sections/course/content/course-info";
import CourseMaterial from "@/sections/course/content/course-material";
import { grey } from "@/theme/color";
import {
  CourseDetailProps,
  GetCourseByIdProps,
  initialCourse,
} from "@/types/course";
import { ModuleDetailProps } from "@/types/module";
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseContent = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetailProps>(initialCourse);
  const [modules, setModules] = useState<GetCourseByIdProps["modules"]>([]);
  const [moduleId, setModuleId] = useState<ModuleDetailProps["id"]>("");
  const { getCourseById } = useCourseContext();

  const onClickModule = useCallback((id: ModuleDetailProps["id"]) => {
    setModuleId(id);
  }, []);

  useEffect(() => {
    const fetchCourseById = async () => {
      if (id) {
        const { course, modules } = await getCourseById(id);
        setCourse(course);
        setModules(modules);
      }
    };
    fetchCourseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "18rem",
          maxHeight: "calc(100vh - 80px)",
          minHeight: "calc(100vh - 80px)",
          position: "fixed",
          borderRadius: 0,
          borderRight: "1.5px solid",
          borderColor: grey[300],
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {course.name}
        </Typography>
        <CourseMaterial
          modules={modules}
          moduleId={moduleId}
          onClickModule={onClickModule}
        />
        <CourseAssignment />
        <CourseInfo />
      </Box>
      <Box
        sx={{
          paddingLeft: "18rem",
        }}
      >
        <CourseContentMain courseName={course.name} moduleId={moduleId} />
      </Box>
    </Box>
  );
};

export default CourseContent;
