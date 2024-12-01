import useCourseContext from "@/hooks/contexts/use-course-context";
import { blue } from "@/theme/color";
import { CourseProps } from "@/types/course";
import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const { getCourses } = useCourseContext();
  const navigate = useNavigate();

  const onCourseClick = useCallback(
    (course: CourseProps) => {
      navigate(`/course/${course.id}`);
    },
    [navigate],
  );

  useEffect(() => {
    const getAllCourses = async () => {
      const courses = await getCourses();
      setCourses(courses);
    };
    getAllCourses();
  }, [getCourses]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 1,
          marginLeft: 1,
          color: blue[800],
          fontWeight: 600,
        }}
      >
        Recommended Courses
      </Typography>
      <Grid2 container spacing={4}>
        {courses?.map((course) => (
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
    </Box>
  );
};

export default CourseList;
