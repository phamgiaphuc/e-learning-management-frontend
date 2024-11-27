import useCourseContext from "@/hooks/contexts/use-course-context";
import { blue } from "@/theme/tailwind-color";
import { CourseDetailProps, inititialCourse } from "@/types/course";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SliderPic from "@/assets/images/slider_pic.png";
import { formatDate } from "@/utils/format-date";
import { grey } from "@mui/material/colors";
import { initialUser, UserDetailProps } from "@/types/user";
import useUserContext from "@/hooks/contexts/use-user-context";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetailProps>(inititialCourse);
  const [teacher, setTeacher] = useState<UserDetailProps>(initialUser);
  const { getCourseById } = useCourseContext();
  const { getUserById } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseById = async () => {
      if (id) {
        const course = await getCourseById(id);
        setCourse(course);
        const teacher = await getUserById(course.teacherId);
        setTeacher(teacher);
      }
    };
    fetchCourseById();
  }, [getCourseById, getUserById, id]);

  return (
    <Stack gap={4}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: blue[100],
          minHeight: 300,
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
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, marginY: 2 }}
          >
            <Typography sx={{ fontWeight: 600 }}>Instructed by </Typography>
            <Avatar src={teacher.userProfile.avatar} alt={teacher.username} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{teacher.username}</Typography>
              <Typography variant="subtitle2">{teacher.email}</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/course/${course.id}/content`);
            }}
            sx={{
              height: 56,
              width: 300,
              borderRadius: 2,
            }}
          >
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Join in class</Typography>
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
            style={{ objectFit: "cover", opacity: 0.75, height: 275 }}
          />
        </Box>
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            bottom: -48,
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
          paddingX: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, marginBottom: 0.5 }}
            >
              Description
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              {course?.description}
            </Typography>
          </Box>
          {course?.thumbnailUrl && (
            <img
              src={course.thumbnailUrl}
              alt={course?.name}
              style={{
                width: 600,
                height: 150,
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default CourseDetailPage;
