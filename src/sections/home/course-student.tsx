import useStudentContext from "@/hooks/contexts/use-student-context";
import { useAppSelector } from "@/hooks/use-app-selector";
import { blue } from "@/theme/color";
import { levels } from "@/types/course";
import { enrollmentStatus, EnrollmentStatus } from "@/types/enrollment";
import { StudentEnrolledCourse } from "@/types/student";
import { formatDate } from "@/utils/format-date";
import {
  Box,
  Button,
  Chip,
  Grid2,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Tab {
  key: EnrollmentStatus;
  label: string;
}

const tabs: Tab[] = [
  {
    key: "IN_PROGRESS",
    label: enrollmentStatus["IN_PROGRESS"],
  },
  {
    key: "COMPLETED",
    label: enrollmentStatus["COMPLETED"],
  },
];

const CourseStudent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [courses, setCourses] = useState<StudentEnrolledCourse[]>([]);
  const { getStudentEnrollments } = useStudentContext();
  const [tab, setTab] = useState<Tab["key"]>("IN_PROGRESS");
  const navigate = useNavigate();

  const filteredCourses = useMemo(
    () => courses.filter((course) => course.status === tab),
    [courses, tab],
  );

  const onHandleTabChange = useCallback(
    (value: EnrollmentStatus) => setTab(value),
    [],
  );

  const onCourseClick = useCallback(
    (courseId: string) => {
      navigate(`/course/${courseId}`);
    },
    [navigate],
  );

  useEffect(() => {
    const getStudentCourses = async () => {
      if (isAuthenticated) {
        const { courses } = await getStudentEnrollments();
        setCourses(courses);
      }
    };
    getStudentCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
          marginLeft: 1,
          fontWeight: "600",
          color: blue[800],
        }}
      >
        My course
      </Typography>
      <Typography
        sx={{
          marginLeft: 1,
        }}
      >
        All your learning in one place! See the courses you're taking
      </Typography>
      <Tabs
        value={tab}
        sx={{
          marginLeft: 1,
        }}
        onChange={(_, value) => onHandleTabChange(value)}
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.key} value={tab.key} />
        ))}
      </Tabs>
      {filteredCourses?.length > 0 ? (
        <Box sx={{ paddingY: 2 }}>
          <Grid2 container>
            {filteredCourses.map((item) => (
              <Grid2 key={item.id} size={6}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    padding: 2,
                    cursor: "pointer",
                    ":hover": {
                      scale: 1.01,
                      transition: "all 0.1s ease-in-out",
                    },
                  }}
                  onClick={() => onCourseClick(item.courseId)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <img
                      src={item.course?.thumbnailUrl}
                      alt={item.course?.slug}
                      style={{
                        width: "30%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                    <Box
                      sx={{
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
                        {item.course?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          overflow: "hidden",
                          fontWeight: 300,
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.course?.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          color={
                            item.status === "IN_PROGRESS"
                              ? "primary"
                              : "success"
                          }
                          label={enrollmentStatus[item.status]}
                          sx={{
                            width: "fit-content",
                          }}
                        />
                        <Chip
                          label={`Joined at ${formatDate(item.enrolledAt)}`}
                          sx={{
                            width: "fit-content",
                          }}
                        />
                        <Chip
                          label={
                            item.course?.level ? levels[item.course.level] : ""
                          }
                          sx={{
                            width: "fit-content",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      ) : (
        <Paper
          elevation={2}
          sx={{
            marginTop: 1,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: 18,
            }}
          >
            No completed courses or guided projects
          </Typography>
          <Typography>Take your skills to the next level</Typography>
          <Button variant="contained" sx={{ marginTop: 1.5, width: 180 }}>
            Start learning
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default CourseStudent;
