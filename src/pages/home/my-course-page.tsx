import { useAppSelector } from "@/hooks/use-app-selector";
import { useDialog } from "@/hooks/use-dialog";
import AddCourseDialog from "@/sections/my-course/teacher/add-course-dialog";
import TeacherCourseList from "@/sections/my-course/teacher/teacher-course-list";
import { blue } from "@/theme/color";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";

const MyCoursePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const courseDialog = useDialog();

  return (
    <>
      <Stack
        sx={{
          paddingX: 4,
          paddingY: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {user?.role === "teacher" && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    color: blue[800],
                  }}
                >
                  Manage your course
                </Typography>
                <Typography>
                  Manage the courses you're teaching and create new learning
                  experiences for your students.
                </Typography>
              </>
            )}
            {user?.role === "user" && (
              <>
                <Typography variant="h5" fontWeight={800}>
                  My courses
                </Typography>
                <Typography>
                  All your learning in one place! See the courses you're taking
                </Typography>
              </>
            )}
          </Box>
          {user?.role === "teacher" && (
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={courseDialog.handleOpen}
                startIcon={<Plus size={20} />}
              >
                Add new course
              </Button>
            </Box>
          )}
        </Box>
        {user?.role === "teacher" && <TeacherCourseList />}
      </Stack>
      {user?.role === "teacher" && (
        <AddCourseDialog
          onClose={courseDialog.handleClose}
          open={courseDialog.open}
        />
      )}
    </>
  );
};

export default MyCoursePage;
