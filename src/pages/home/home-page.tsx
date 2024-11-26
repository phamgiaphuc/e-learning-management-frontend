import SliderPic from "@/assets/images/slider_pic.png";
import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import CourseList from "@/sections/home/course-list";
import CourseStudent from "@/sections/home/course-student";
import CourseTeacher from "@/sections/home/course-teacher";
import { blue } from "@/theme/color";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

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

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useMetaTitle({ title: "Home" });

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
        {!isAuthenticated && (
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
        )}
        <Stack gap={2}>
          {user?.role === "user" ? <CourseStudent /> : <CourseTeacher />}
          <CourseList />
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
