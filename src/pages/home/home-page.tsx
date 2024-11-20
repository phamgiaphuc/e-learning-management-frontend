import CustomCourseCard from "@/components/card/course-card";
import useCourseContext from "@/hooks/contexts/use-course-context";
import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import ContinueLearningSection from "@/sections/home/continue-learning";
import HomeHeroContent from "@/sections/home/hero-content";
import { blue } from "@/theme/color";
import { CourseProps } from "@/types/course";
import { Box, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";

//DUMMY DATA
// const courses = [
//   {
//     title: "Advanced Learning Algorithms",
//     subtitle: "Course by IBM",
//     image: ala,
//   },

//   {
//     title: "Mathematics for Machine Learning Specialization",
//     subtitle: "Course by Instructor David",
//     image: math,
//   },

//   {
//     title: "Python for Data Science, AI & Development",
//     subtitle: "Course by Professor Joseph Santarcangelo",
//     image: python,
//   },

//   {
//     title: "Python for Data Science, AI & Development",
//     subtitle: "Course by Professor Joseph Santarcangelo",
//     image: python,
//   },

//   {
//     title: "Advanced Learning Algorithms",
//     subtitle: "Course by IBM",
//     image: ala,
//   },

//   {
//     title: "Mathematics for Machine Learning Specialization",
//     subtitle: "Course by Instructor David",
//     image: math,
//   },

//   {
//     title: "Python for Data Science, AI & Development",
//     subtitle: "Course by Professor Joseph Santarcangelo",
//     image: python,
//   },

//   {
//     title: "Python for Data Science, AI & Development",
//     subtitle: "Course by Professor Joseph Santarcangelo",
//     image: python,
//   },
// ];

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

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [courses, setCourses] = useState<Array<CourseProps>>([]);
  const { getCourses } = useCourseContext();
  const [value, setValue] = useState(0);
  useMetaTitle({ title: isAuthenticated ? "Home" : "Home before login" });

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
        {isAuthenticated ? <ContinueLearningSection /> : <HomeHeroContent />}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginX: 2,
          }}
        >
          {isAuthenticated ? (
            <Typography
              variant="h5"
              color="primary.main"
              gutterBottom
              fontWeight={700}
            >
              What to learn next?
            </Typography>
          ) : (
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
          )}
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

export default HomePage;
