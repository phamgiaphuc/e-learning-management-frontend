import useTeacherContext from "@/hooks/contexts/use-teacher-context";
import { CourseProps } from "@/types/course";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Grid2, Paper, Stack, Typography } from "@mui/material";

const TeacherCourseList = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const { getTeacherCourses } = useTeacherContext();
  const navigate = useNavigate();

  const onCourseClick = useCallback(
    (course: CourseProps) => {
      navigate(`/course/${course.id}`);
    },
    [navigate],
  );

  useEffect(() => {
    const getAllTeacherCourses = async () => {
      const teacherCourses = await getTeacherCourses();
      setCourses(teacherCourses);
    };
    getAllTeacherCourses();
  }, [getTeacherCourses]);

  return (
    <Grid2 container spacing={4}>
      {courses?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginTop: 8,
          }}
        >
          <Alert severity="error">
            <Typography>
              No courses or guided projects are currently available. Please
              create your first course.
            </Typography>
          </Alert>
        </Box>
      )}
      {courses &&
        courses.map((course) => (
          <Grid2 size={3} key={course.id}>
            <Paper
              elevation={2}
              sx={{
                padding: 2,
                height: 300,
                borderRadius: 4,
                cursor: "pointer",
                ":hover": {
                  scale: 1.01,
                  transition: "all 0.1s ease-in-out",
                },
              }}
              onClick={() => onCourseClick(course)}
            >
              <Stack gap={1.5}>
                <img
                  src={course.thumbnailUrl}
                  alt={course.slug}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
                <Box
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {course.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      overflow: "hidden",
                      fontWeight: 300,
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {course.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid2>
        ))}
    </Grid2>
  );
};

export default TeacherCourseList;
