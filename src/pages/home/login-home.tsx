import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { blue } from "@/theme/color";
import python from "@/assets/images/python.png";
import ala from "@/assets/images/ala.png";
import math from "@/assets/images/math.png";
import useMetaTitle from "@/hooks/use-meta-title";

const CourseBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: "1rem 3rem 0 3rem",
  flexGrow: 1,
});
const Chips = styled(Chip)({
  borderRadius: "0.5rem",
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

const LoginHomePage = () => {
  useMetaTitle({ title: "Home login" });

  return (
    <>
      <Box margin="2rem 3rem">
        <Typography variant="h5" color={blue[900]} gutterBottom>
          Continue Learning
        </Typography>
        <Card
          sx={{
            borderRadius: "1rem",
            boxShadow: "0 5px 10px black",
          }}
        >
          <Box display="flex">
            <Box padding="2rem 1rem 2rem 1rem">
              <CardMedia
                component="img"
                style={{ width: "10rem", height: "10rem" }}
                image={python}
                alt="Data Visualization with Python"
              />
            </Box>
            <CardContent style={{ flex: 1 }}>
              <Stack direction="row" spacing={1}>
                <Chips label="Beginers" color="success" />
                <Chips label="Data visualization" color="primary" />
              </Stack>
              <Typography variant="body2" color="text.secondary" marginTop={2}>
                Course| Offer by IBM
              </Typography>
              <Typography
                gutterBottom
                color={blue[900]}
                variant="h6"
                component="div"
              >
                Data Visualization with Python
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data visualization is the graphical representation of data in
                order to interactively and efficiently convey insights to
                clients.
              </Typography>
              <Box display="flex" alignItems="center" marginTop={2}>
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  value={10}
                  sx={{
                    height: "10px",
                    borderRadius: "10px",
                    width: "100%",
                    marginRight: "1rem",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  10%
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Overall
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
      <Box margin="2rem 3rem">
        <Typography variant="h5" color={blue[900]} gutterBottom>
          What to learn next?
        </Typography>
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

export default LoginHomePage;
