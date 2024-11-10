import ala from "@/assets/images/ala.png";
import math from "@/assets/images/math.png";
import python from "@/assets/images/python.png";
import pic from "@/assets/images/slider_pic.png";
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
import { styled } from "@mui/system";
import React from "react";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  borderRadius: "0.5rem",
  padding: "1rem 3rem 3rem 3rem",
  margin: "1rem 2rem 0 2rem",
  boxShadow: "0 0.1rem 0.2rem 0 black",
  backgroundColor: "#cce4ff",
  height: "295px",
});

const TextContainer = styled(Box)({
  flex: 1,
});

const ImageContainer = styled(Box)({
  flexShrink: 0,
  position: "relative",
  paddingTop: "3rem",
});

const StyledTypography = styled(Typography)({
  fontWeight: "bolder",
  color: blue[900],
  paddingBottom: "2rem",
  lineHeight: "0.6",
  fontFamily: "Poppins",
});

const StyledImage = styled("img")({});

const NavigationTabs = styled(Tabs)({
  boxShadow: "0 2px 0 0 rgba(29, 11, 20, 0.2)",
  margin: "0 3rem 0rem 3rem",
  width: "100%",
  minHeight: "2rem",
});

const CustomTab = styled(Tab)(() => ({
  "&.Mui-selected": {
    color: blue[800],
  },

  fontFamily: "Poppins",
  minHeight: "2rem",
  padding: "0.5rem 1rem",
  textTransform: "none",
}));

const CourseBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: "1rem 3rem 0 3rem",
  flexGrow: 1,
});

const CourseCard = styled(Card)({
  maxWidth: "19rem",
  minWidth: "19rem",
  maxHeight: "18rem",
  marginBottom: "1rem",
});

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
  // Actions
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<object>, newValue: number) => {
    setValue(newValue);
  };

  useMetaTitle({ title: "Home before login" });

  return (
    <>
      <Container>
        <TextContainer>
          <Typography
            sx={{
              fontFamily: "Poppins",
              marginBottom: 5,
              letterSpacing: "0.3rem",
              fontWeight: "600",
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
            }}
            variant="h3"
          >
            Sharpen Your Skills
          </StyledTypography>
          <StyledTypography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "500",
            }}
            variant="h6"
          >
            With Professional Online Courses
          </StyledTypography>
        </TextContainer>
        <ImageContainer>
          <StyledImage src={pic} alt="img" />
        </ImageContainer>
      </Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <NavigationTabs value={value} onChange={handleChange}>
          <CustomTab label="Network" />
          <CustomTab label="Front-end" />
          <CustomTab label="Back-end" />
          <CustomTab label="Database" />
          <CustomTab label="AI" />
        </NavigationTabs>
      </Box>
      <CourseBox>
        {courses.map((course, index) => (
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
        ))}
      </CourseBox>
    </>
  );
};

export default DefalutHomePage;
