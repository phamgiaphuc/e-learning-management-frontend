import SliderPic from "@/assets/images/slider_pic.png";
import CustomCourseCard from "@/components/card/card";
import useCourseContext from "@/hooks/contexts/use-course-context";
import useMetaTitle from "@/hooks/use-meta-title";
import { blue } from "@/theme/color";
import { CourseProps } from "@/types/course";
import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";

const Container = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "0.5rem",
  padding: "2rem 2rem 2rem 2rem",
  marginTop: 4,
  marginRight: 42,
  marginLeft: 42,
  boxShadow: "0 0.1rem 0.2rem 0",
  backgroundColor: "#cce4ff",
  overflow: "hidden",
});

const ImageContainer = styled(Box)({
  position: "absolute",
  top: -28,
  right: 32,
});

const StyledTypography = styled(Typography)({
  fontWeight: "bolder",
  color: blue[900],
});

const StyledImage = styled("img")({
  height: "20rem",
});

const NavigationTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "blue",
  },
});

const CustomTab = styled(Tab)(() => ({
  "&.Mui-selected": {
    color: blue[800],
  },
}));

const DefaultHomePage: React.FC = () => {
  const [courses, setCourses] = useState<Array<CourseProps>>([]);
  const { getCourses } = useCourseContext();
  const [value, setValue] = useState(0);
  useMetaTitle({ title: "Home before login" });

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getCourses();
      setCourses(courses);
    }
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 2,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                letterSpacing: "0.3rem",
                fontWeight: "600",
                marginBottom: 5,
              }}
              variant="h6"
              color="textSecondary"
            >
              ONLINE COURSE
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <StyledTypography
                sx={{
                  fontSize: "3rem",
                  fontWeight: "600",
                }}
                variant="h3"
              >
                Sharpen Your Skills
              </StyledTypography>
              <StyledTypography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "500",
                }}
                variant="h6"
              >
                With Professional Online Courses
              </StyledTypography>
            </Box>
          </Box>
          <ImageContainer>
            <StyledImage src={SliderPic} alt="img" />
          </ImageContainer>
        </Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginX: 5,
          }}
        >
          <NavigationTabs
            value={value}
            onChange={(_, value) => setValue(value)}
          >
            <CustomTab label="Network" />
            <CustomTab label="Front-end" />
            <CustomTab label="Back-end" />
            <CustomTab label="Database" />
            <CustomTab label="AI" />
          </NavigationTabs>
          <Grid2
            container
            spacing={3}
            sx={{
              marginTop: 2,
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

export default DefaultHomePage;
