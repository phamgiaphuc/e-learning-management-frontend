import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import useMetaTitle from "@/hooks/use-meta-title";

const CoursePage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  useMetaTitle({ title: `Course - ${title}` });

  // Dummy data for demonstration purposes
  const courseDetails = {
    title: title,
    subtitle: "This is a detailed subtitle for the course.",
    description:
      "This is a detailed description of the course. It covers various topics and provides in-depth knowledge.",
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h3" component="h1" gutterBottom>
        {courseDetails.title}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {courseDetails.subtitle}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {courseDetails.description}
      </Typography>
    </Box>
  );
};

export default CoursePage;
