import { blue } from "@/theme/color";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CourseTeacher = () => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate("/my-course");
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginLeft: 1,
          fontWeight: "600",
          color: blue[800],
        }}
      >
        Manage your course
      </Typography>
      <Typography
        sx={{
          marginLeft: 1,
        }}
      >
        Manage the courses you're teaching and create new learning experiences
        for your students.
      </Typography>
      <Paper
        elevation={2}
        sx={{
          marginTop: 2,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: 18,
          }}
        >
          No courses or guided projects are currently available
        </Typography>
        <Typography>Create your first course</Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: 1.5 }}
          startIcon={<ChevronRight size={20} />}
          onClick={onClick}
        >
          Start creating courses
        </Button>
      </Paper>
    </Box>
  );
};

export default CourseTeacher;
