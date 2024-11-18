import useCourseContext from "@/hooks/contexts/use-course-context";
import useMetaTitle from "@/hooks/use-meta-title";
import { CourseProps, intitialCourseValues } from "@/types/course";
import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseOverviewPage: React.FC = () => {
  const [course, setCourse] = useState<CourseProps>(intitialCourseValues);
  const { getCourseById } = useCourseContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [buttonText, setButtonText] = useState("Enroll for Free");
  const [buttonColor, setButtonColor] = useState<"primary" | "secondary">(
    "secondary",
  );

  const handleButtonClick = () => {
    if (!authenticated) {
      navigate(`/signin`);
    } else {
      if (!enrolled) {
        enrollInCourse().then(() => {
          setEnrolled(true);
          setButtonText("Start Learning");
          setButtonColor("primary");
        });
      } else {
        navigate(`/course/${course.id}/details`);
      }
    }
  };

  const enrollInCourse = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  useEffect(() => {
    const isAuth = true;
    setAuthenticated(isAuth);

    if (isAuth) {
      const isEnrolled = false;
      setEnrolled(isEnrolled);
      if (isEnrolled) {
        setButtonText("Start Learning");
        setButtonColor("primary");
      } else {
        setButtonText("Enroll for Free");
        setButtonColor("secondary");
      }
    }
  }, []);

  useEffect(() => {
    async function fetchCourseById() {
      const course = await getCourseById(String(id));
      setCourse(course);
    }
    fetchCourseById();
  }, [getCourseById, id, setCourse]);

  useMetaTitle({ title: `Course Overview - ${course.name}` });

  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Typography variant="h4" gutterBottom>
        Course Overview: {course.name}
      </Typography>

      <Button
        onClick={handleButtonClick}
        sx={{ cursor: "pointer", mt: 2 }}
        variant="contained"
        size="large"
        color={buttonColor}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default CourseOverviewPage;
