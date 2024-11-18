import useMetaTitle from "@/hooks/use-meta-title";
import { 
Box,
Button,
Typography
} from "@mui/material";
import React,{ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const CourseOverviewPage: React.FC = () => {
const { title } = useParams<{ title: string }>();
useMetaTitle({ title: `Course Overview - ${title}` });
const navigate = useNavigate();

const [authenticated, setAuthenticated] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [buttonText, setButtonText] = useState("Enroll for Free");
  const [buttonColor, setButtonColor] = useState<"primary" | "secondary">("secondary");

  
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

  const handleButtonClick = () => {
    if (!authenticated) {
      navigate(`/signin`);
    } else {
      if (!enrolled) {
        enrollInCourse()
          .then(() => {
            setEnrolled(true);
            setButtonText("Start Learning");
            setButtonColor("primary");
          })
      } else {
        navigate(`/course/${title}/details`);
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


  return (
    <Box 
    display="flex" 
    flex={1} 
    flexDirection="column" >

      <Typography 
      variant="h4" 
      gutterBottom>
          Course Overview: {title}
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
