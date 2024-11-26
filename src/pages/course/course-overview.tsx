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
import { useParams, useNavigate } from "react-router-dom";
import SliderPic from "@/assets/images/slider_pic.png";
import { formatDate } from "@/utils/format-date";
import { grey } from "@mui/material/colors";
// import HCMIUIcon from "@/assets/icons/hcmiu.png";
import { Star } from "lucide-react";
import { useAppSelector } from "@/hooks/use-app-selector";
import { UserDetailProps } from "@/types/user";

const CourseOverviewPage: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetailProps>(inititialCourse);
  const [teacher, setTeacher] = useState<UserDetailProps | null>(null);
  const { getCourseById, getUserById } = useCourseContext();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleEnrollClick = () => {
    if (isAuthenticated) {
      navigate(`/course/${course.id}/content`);
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchCourseById = async () => {
      if (id) {
        const course = await getCourseById(id);
        setCourse(course);
        if (course.teacherId) {
          const teacher = await getUserById(course.teacherId);
          setTeacher(teacher);
        }
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
          height: 400,
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
            paddingY: 2,
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="Course Image"
            style={{ width: "8rem", height: "auto", marginBottom: "1rem" }}
          />
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {course.name}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
            }}
          >
            <Avatar
              sx={{
                cursor: "pointer",
                color: "primary.main",
                bgcolor: "#fff",
                marginRight: 3,
              }}
              src={teacher?.userProfile.avatar}
            />
            Intructor: {teacher?.username}
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: 56,
              marginTop: 2,
              width: 240,
              borderRadius: 2,
            }}
            onClick={handleEnrollClick}
          >
            <Stack>
              <Typography sx={{ fontWeight: 600 }}>Join the class</Typography>
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
          <Typography
            sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
          >
            Included with Scholaro{" "}
            {/* <img src={HCMIUIcon} alt="hcmiu-logo" height={38} width={38} /> */}
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
                  1 Course series
                </Typography>
                <Typography variant="body2">
                  Get in-depth knowledge of a subject
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
                  {course.rating}{" "}
                  <Star
                    fill="blue"
                    color="blue"
                    size={18}
                    style={{ marginLeft: "4px" }}
                  />
                </Typography>
                <Typography variant="body2">
                  {course.numReviews} reviews
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
                  {course.level} levels
                </Typography>
                <Typography variant="body2">Recommended experience</Typography>
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
                  Flexible schedule
                </Typography>
                <Typography variant="body2">
                  2 months, 10 hours a week
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
            At a Glance
          </Typography>
          <Typography>{course.description}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default CourseOverviewPage;
