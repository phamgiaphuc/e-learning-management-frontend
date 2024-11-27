import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import CourseList from "@/sections/home/course-list";
import CourseStudent from "@/sections/home/course-student";
import CourseTeacher from "@/sections/home/course-teacher";
import { Box, Stack } from "@mui/material";

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useMetaTitle({ title: "Home" });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          gap: 2,
          alignItems: "center",
        }}
      >
        {!isAuthenticated && <Box sx={{ height: "50vh" }}>ABC</Box>}
        <Stack gap={2}>
          {user?.role === "user" ? <CourseStudent /> : <CourseTeacher />}
          <CourseList />
        </Stack>
      </Box>
    </>
  );
};

export default HomePage;
