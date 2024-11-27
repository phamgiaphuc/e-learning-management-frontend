import CustomCourseCard from "@/components/card/course-card";
import useCourseContext from "@/hooks/contexts/use-course-context";
import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import { CourseProps } from "@/types/course";
import { Box, Grid2, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)({
  fontSize: "large",
  fontWeight: "bolder",
  color: "#053368",
});

const HomePage = () => {
  const [courses, setCourses] = useState<Array<CourseProps>>([]);
  const { getCourses } = useCourseContext();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getCourses();
      setCourses(courses);
    }
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMetaTitle({ title: "Home" });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          gap: 2,
          alignItems: "center",
        }}
      >
        {!isAuthenticated && (
          <Box sx={{ height: "50vh" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  letterSpacing: "0.3rem",
                  fontWeight: "600",
                  marginBottom: 3,
                }}
                variant="h6"
                color="textSecondary"
              >
                ONLINE COURSE
              </Typography>
              <StyledTypography
                sx={{
                  fontSize: "4rem",
                  fontWeight: "600",
                  marginBottom: 1,
                }}
                variant="h1"
              >
                Sharpen Your Skills
              </StyledTypography>
              <StyledTypography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "500",
                  marginBottom: 2,
                }}
                variant="h3"
              >
                With Professional Online Courses
              </StyledTypography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  color: "grey.800",
                }}
                variant="h6"
              >
                Not yet have an account? Sign up{" "}
                <Link
                  sx={{
                    color: "primary.main",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  here
                </Link>
              </Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginX: 5,
          }}
        >
          <Grid2
            container
            spacing={3}
            sx={{
              gap: 3,
            }}
          >
            {courses?.map((course, index) => (
              <Grid2 size={3}>
                <CustomCourseCard course={course} key={index} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
