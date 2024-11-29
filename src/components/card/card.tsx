import { CourseProps } from "@/types/course";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const CourseCard = styled(Card)({
  boxShadow: "0px 5px 6px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
  cursor: "pointer",
});

interface CardProps {
  course: CourseProps;
}

const CustomCourseCard = ({ course }: CardProps) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <CourseCard key={course.id} onClick={onCardClick}>
      <CardMedia
        component="img"
        image={course.thumbnailUrl}
        alt={course.name}
        sx={{
          objectFit: "cover",
          width: "95%",
          height: "170px",
          margin: "auto",
          paddingTop: "10px",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      />
      <CardContent sx={{ paddingTop: 1.5 }}>
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
          {course.name}
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
          {course.slug}
        </Typography>
      </CardContent>
    </CourseCard>
  );
};

export default CustomCourseCard;
