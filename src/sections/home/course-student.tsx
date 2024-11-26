import { blue } from "@/theme/color";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";

const CourseStudent = () => {
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
        My course
      </Typography>
      <Typography
        sx={{
          marginLeft: 1,
        }}
      >
        All your learning in one place! See the courses you're taking
      </Typography>
      <Tabs
        value="in-progress"
        sx={{
          marginLeft: 1,
        }}
      >
        <Tab label="In Progress" key="in-progress" value="in-progress" />
        <Tab label="Completed" key="completed" value="completed" />
      </Tabs>
      <Paper
        elevation={2}
        sx={{
          marginTop: 1,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: 18,
          }}
        >
          No completed courses or guided projects
        </Typography>
        <Typography>Take your skills to the next level</Typography>
        <Button variant="contained" sx={{ marginTop: 1.5, width: 180 }}>
          Start learning
        </Button>
      </Paper>
    </Box>
  );
};

export default CourseStudent;
