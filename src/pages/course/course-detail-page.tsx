import useCourseContext from "@/hooks/contexts/use-course-context";
import { blue } from "@/theme/tailwind-color";
import {
  CourseDetailProps,
  GetCourseByIdProps,
  initialCourse,
  levels,
  levelSubs,
} from "@/types/course";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SliderPic from "@/assets/images/slider_pic.png";
import { formatDate } from "@/utils/format-date";
import { grey } from "@mui/material/colors";
import { initialUser, UserDetailProps } from "@/types/user";
import useUserContext from "@/hooks/contexts/use-user-context";
import { Info } from "lucide-react";
import CourseContentList from "@/sections/course/course-content-list";
import { useAppSelector } from "@/hooks/use-app-selector";
import useEnrollmentContext from "@/hooks/contexts/use-enrollment-context";
import useStudentContext from "@/hooks/contexts/use-student-context";
import { StudentEnrolledCourse } from "@/types/student";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [course, setCourse] = useState<CourseDetailProps>(initialCourse);
  const [modules, setModules] = useState<GetCourseByIdProps["modules"]>([]);
  const [teacher, setTeacher] = useState<UserDetailProps>(initialUser);
  const [userLearnings, setUserLearnings] = useState<{
    courses: StudentEnrolledCourse[];
  }>({
    courses: [],
  });
  const { getCourseById } = useCourseContext();
  const { getUserById } = useUserContext();
  const { createEnrollment } = useEnrollmentContext();
  const { getStudentEnrollments } = useStudentContext();
  const navigate = useNavigate();

  const courseBelongToUser = useMemo(
    () =>
      user?.id === teacher.id ||
      userLearnings.courses.find((c) => c.studentId === user?.id),
    [teacher.id, user?.id, userLearnings.courses],
  );

  const onClickBtn = useCallback(async () => {
    if (!isAuthenticated) {
      navigate(`/login?courseId=${id}`);
      return;
    }
    if (courseBelongToUser) {
      navigate(`/course/${id}/content`);
      return;
    }
    if (id) {
      await createEnrollment(id);
      navigate(`/course/${id}/content`);
    }
  }, [courseBelongToUser, createEnrollment, id, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCourseById = async () => {
      if (id) {
        const { course, modules } = await getCourseById(id);
        setCourse(course);
        setModules(modules);
        const teacher = await getUserById(course.teacherId);
        setTeacher(teacher);
      }
    };
    fetchCourseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const fetchUserLearnings = async () => {
      if (user?.role === "user") {
        const { courses } = await getStudentEnrollments();
        setUserLearnings({ courses });
      }
    };
    fetchUserLearnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

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
            onClick={onClickBtn}
            sx={{
              height: 56,
              width: 300,
              borderRadius: 2,
            }}
          >
            {!courseBelongToUser ? (
              <Stack>
                <Typography sx={{ fontWeight: 600 }}>
                  Join course now
                </Typography>
                <Typography variant="body2">
                  Starts at {formatDate(course.createdAt)}
                </Typography>
              </Stack>
            ) : (
              <Stack>
                <Typography sx={{ fontWeight: 600 }}>
                  See course content
                </Typography>
                <Typography variant="body2">
                  Created at {formatDate(course.createdAt)}
                </Typography>
              </Stack>
            )}
          </Button>
          <Typography sx={{ display: "flex", marginY: 1.5 }}>
            <Typography sx={{ fontWeight: 600, marginRight: 0.5 }}>
              {course.numEnrollments}
            </Typography>
            students already enrolled
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
                  {modules?.length} modules
                </Typography>
                <Typography variant="body2">
                  Understand the basics and develop foundational knowledge of a
                  topic.
                </Typography>
              </Box>
            </Grid2>
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
                  {course.numLessons} lessons
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
                  {levels[course.level]} level
                </Typography>
                <Typography variant="body2">
                  {levelSubs[course.level]}
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
                  {course.rating} stars
                </Typography>
                <Typography variant="body2">Ratings</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          paddingX: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                marginBottom: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Info size={20} /> Description
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              {course?.description}
            </Typography>
            <Typography
              sx={{
                display: "inline-flex",
                gap: 0.5,
                marginTop: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Created at:
              </Typography>
              {formatDate(course.createdAt)}
            </Typography>
            <Typography
              sx={{
                display: "inline-flex",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Course slug:
              </Typography>
              {course.slug}
            </Typography>
          </Box>
          {course?.thumbnailUrl && (
            <img
              src={course.thumbnailUrl}
              alt={course?.name}
              style={{
                width: 600,
                height: 180,
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          )}
        </Box>
        <CourseContentList modules={modules} />
      </Box>
    </Stack>
  );
};

export default CourseDetailPage;
