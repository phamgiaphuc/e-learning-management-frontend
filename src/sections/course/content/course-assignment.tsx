import { Box, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";

const CourseAssignment = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <ChevronRight size={20} />
      <Typography>Assignments</Typography>
    </Box>
  );
};

export default CourseAssignment;
