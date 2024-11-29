import { Box, Typography } from "@mui/material";

const CourseInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
        cursor: "pointer",
        marginLeft: 3.5,
      }}
    >
      <Typography>Course information</Typography>
    </Box>
  );
};

export default CourseInfo;
