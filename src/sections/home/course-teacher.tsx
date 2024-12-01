import useTeacherContext from "@/hooks/contexts/use-teacher-context";
import { blue } from "@/theme/color";
import { CourseDetailProps, CourseProps } from "@/types/course";
import { formatDate } from "@/utils/format-date";
import { Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseTeacher = () => {
  const [courses, setCourses] = useState<CourseDetailProps[]>([]);
  const { getTeacherCourses } = useTeacherContext();
  const navigate = useNavigate();

  const onClickMyCourse = useCallback(() => {
    navigate("/my-course");
  }, [navigate]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginLeft: 1,
          fontWeight: "600",
          color: blue[800],
        }}
      >
        Manage your course
      </Typography>
      <Typography
        sx={{
          marginLeft: 1,
        }}
      >
        Manage the courses you're teaching and create new learning experiences
        for your students.
      </Typography>
      {courses.length > 0 ? (
        <Grid2
          container
          spacing={4}
          sx={{
            marginTop: 2,
          }}
        >
          {courses.map((course) => (
            <Grid2 size={3} key={course.id}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  borderRadius: 4,
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.01)",
                    transition: "all 0.1s ease-in-out",
                  },
                }}
                onClick={() => onCourseClick(course)}
              >
                <Stack gap={1.5}>
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
                        WebkitLineClamp: 2,
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
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {course.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      Created at {formatDate(course.createdAt)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Paper
          elevation={2}
          sx={{
            marginTop: 2,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: 18,
            }}
          >
            No courses or guided projects are currently available
          </Typography>
          <Typography>Create your first course</Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: 1.5 }}
            startIcon={<ChevronRight size={20} />}
            onClick={onClickMyCourse}
          >
            Start creating courses
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default CourseTeacher;
