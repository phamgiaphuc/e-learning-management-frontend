import ala from "@/assets/images/ala.png";
import math from "@/assets/images/math.png";
import python from "@/assets/images/python.png";
import useMetaTitle from "@/hooks/use-meta-title";
import { blue } from "@/theme/color";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid2,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "@/components/card/card";

const Chips = styled(Chip)({
  borderRadius: "0.5rem",
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
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(`/course/${title}/details`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
          paddingY: 2,
          gap: 2,
        }}
      >
        <Typography variant="h5" color={blue[900]} fontWeight={700}>
          Continue Learning
        </Typography>
        <Card
          sx={{
            borderRadius: "1rem",
            boxShadow: "0 2.5px 5px black",
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Typography>Overall Progress</Typography>
                <Button
                  onClick={onButtonClick}
                  sx={{ cursor: "pointer" }}
                  variant="outlined"
                  color="secondary"
                >
                  Go to class
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            color={blue[900]}
            gutterBottom
            fontWeight={700}
          >
            What to learn next?
          </Typography>
          <Grid2 container spacing={2}>
            {courses.map((course, index) => (
              <Grid2 size={3}>
              <CourseCard course={course} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </>
  );
};

export default LoginHomePage;
