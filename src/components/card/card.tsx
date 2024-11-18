import React from 'react'
import { Card, CardContent, CardMedia, Typography, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import {  useNavigate } from 'react-router-dom';

const CourseCard = styled(Card)({});

interface Course {
  image: string;
  title: string;
  subtitle: string;
}

interface CardProps {
  course: Course;
}

const card: React.FC<CardProps> = ({ course }) => {

   const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/course/${course.title}`);
  };

  return (
    <CourseCard >
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
    <CardContent  sx={{ paddingTop: "0",cursor: 'pointer', "&:hover": {
    textDecoration: "underline",
  },  }} onClick={onCardClick} >
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
  )
}

export default card
