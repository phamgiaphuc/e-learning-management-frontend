import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";

const CoursesPage = () => {
  useMetaTitle({ title: "Courses" });

  return (
    <Box
      sx={{
        backgroundColor: "gray",
      }}
    >
      CoursesPage
    </Box>
  );
};

export default CoursesPage;
