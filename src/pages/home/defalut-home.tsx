import ala from "@/assets/images/ala.png";
import math from "@/assets/images/math.png";
import python from "@/assets/images/python.png";
import SliderPic from "@/assets/images/slider_pic.png";
import useMetaTitle from "@/hooks/use-meta-title";
import { blue } from "@/theme/color";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Grid, styled } from "@mui/system";
import React from "react";

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

const CourseCard = styled(Card)({});

const courses = [
  {
    title: "Advanced Learning Algorithms",
    subtitle: "Course by IBM",
    image: ala,
  },

  {
    title: "Mathematics for Machine Learning Specialization",
    subtitle: "Course by Instructor David",
    image: math,
  },

  {
    title: "Python for Data Science, AI & Development",
    subtitle: "Course by Professor Joseph Santarcangelo",
    image: python,
  },

  {
    title: "Python for Data Science, AI & Development",
    subtitle: "Course by Professor Joseph Santarcangelo",
    image: python,
  },

  {
    title: "Advanced Learning Algorithms",
    subtitle: "Course by IBM",
    image: ala,
  },

  {
    title: "Mathematics for Machine Learning Specialization",
    subtitle: "Course by Instructor David",
    image: math,
  },

  {
    title: "Python for Data Science, AI & Development",
    subtitle: "Course by Professor Joseph Santarcangelo",
    image: python,
  },

  {
    title: "Python for Data Science, AI & Development",
    subtitle: "Course by Professor Joseph Santarcangelo",
    image: python,
  },
];

const DefalutHomePage: React.FC = () => {
  const [value, setValue] = React.useState(0);
  useMetaTitle({ title: "Home before login" });

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
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: 2,
            }}
          >
            {courses.map((course, index) => (
              <Grid size={3}>
                <CourseCard key={index}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      objectFit: "cover",
                      width: "95%",
                      height: "170px",
                      margin: "auto",
                      paddingTop: "8px",
                      borderRadius: "1rem",
                    }}
                  />
                  <CardContent sx={{ paddingTop: "0" }}>
                    <Typography
                      sx={{
                        paddingTop: 0,
                        fontSize: "16px",
                        fontWeight: "650",
                        fontFamily: "Poppins",
                        minHeight: "3rem",
                      }}
                      color={blue[900]}
                      variant="h6"
                      component="div"
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {course.subtitle}
                    </Typography>
                  </CardContent>
                </CourseCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default DefalutHomePage;
