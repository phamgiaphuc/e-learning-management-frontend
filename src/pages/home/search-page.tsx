import useQuery from "@/hooks/use-query";
import { Chip, Grid2, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import useCourseContext from "@/hooks/contexts/use-course-context";
import { CourseProps, levels } from "@/types/course";

const SearchPage = () => {
  const query = useQuery();
  const [key, setKey] = useState<string>("");
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const { getCourses } = useCourseContext();
  const navigate = useNavigate();

  const onCourseClick = useCallback(
    (course: CourseProps) => {
      navigate(`/course/${course.id}`);
    },
    [navigate],
  );

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(key.toLowerCase()) &&
      (selectedLevel === "ALL" || course.level === selectedLevel),
  );

  useEffect(() => {
    setKey(query.get("key") || "");
  }, [query]);

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
        padding: 2,
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
        Result for "{key}"
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          marginBottom: 2,
          marginLeft: 1,
        }}
      >
        <Chip
          label="All"
          color={selectedLevel === "ALL" ? "primary" : "default"}
          onClick={() => setSelectedLevel("ALL")}
        />
        {Object.keys(levels).map((level) => (
          <Chip
            key={level}
            label={levels[level as keyof typeof levels]}
            color={selectedLevel === level ? "primary" : "default"}
            onClick={() => setSelectedLevel(level)}
          />
        ))}
      </Box>
      {filteredCourses.length > 0 ? (
        <Grid2 container spacing={2}>
          {filteredCourses.map((course) => (
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
                    {/* <Typography> {course.numEnrollments} enrolled</Typography> */}
                  </Box>
                </Stack>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            There is no result found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
