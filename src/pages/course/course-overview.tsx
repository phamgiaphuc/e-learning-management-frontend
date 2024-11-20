import useCourseContext from "@/hooks/contexts/use-course-context";
import { blue } from "@/theme/tailwind-color";
import { CourseProps, inititialCourse } from "@/types/course";
import { Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SliderPic from "@/assets/images/slider_pic.png";
import { formatDate } from "@/utils/format-date";
import { grey } from "@mui/material/colors";

const CourseOverviewPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseProps>(inititialCourse);
  const { getCourseById } = useCourseContext();

  useEffect(() => {
    const fetchCourseById = async () => {
      if (id) {
        const course = await getCourseById(id);
        setCourse(course);
      }
    };
    fetchCourseById();
  }, [getCourseById, id]);

  return (
    <Stack gap={4}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: blue[100],
          height: 300,
          display: "flex",
          paddingRight: 16,
          paddingLeft: 8,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingY: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {course.name}
          </Typography>
          <Typography>{course.slug}</Typography>
          <Button
            variant="contained"
            sx={{
              height: 56,
              marginTop: 2,
              width: 240,
              borderRadius: 2,
            }}
          >
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Enroll for free</Typography>
              <Typography variant="body2">
                Starts at {formatDate(course.createdAt)}
              </Typography>
            </Stack>
          </Button>
          <Typography sx={{ display: "flex", marginY: 1.5 }}>
            <Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>
              {course.numEnrollments}
            </Typography>
            already enrolled
          </Typography>
        </Box>
        <Box>
          <img
            src={SliderPic}
            height="100%"
            style={{ objectFit: "cover", opacity: 0.75 }}
          />
        </Box>
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            bottom: -64,
            left: 64,
            height: 100,
            backgroundColor: "white",
            width: "calc(100vw - 128px)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Grid2
            container
            sx={{
              width: "100%",
            }}
            columnSpacing={2}
          >
            <Grid2 size={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {course.numLessons} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {course.numLessons} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                  borderRight: 1,
                  borderColor: grey[600],
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {course.numLessons} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals.
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {course.numLessons} modules
                </Typography>
                <Typography variant="body2">
                  Gain insight into a topic and learn the fundamentals.
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
      <Box
        sx={{
          marginTop: 6,
          paddingX: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 0.5 }}>
            Description
          </Typography>
          <Typography>{course.description}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default CourseOverviewPage;
