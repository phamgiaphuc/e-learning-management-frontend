import { useAppSelector } from "@/hooks/use-app-selector";
import { useDialog } from "@/hooks/use-dialog";
import AddCourseDialog from "@/sections/my-course/add-course-dialog";
import CompletedSection from "@/sections/my-course/completed-section";
import InProgressSection from "@/sections/my-course/in-progress-section";
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useState } from "react";

type TabKey = "in-progress" | "completed";

const MyCoursePage = () => {
  const [tab, setTab] = useState<TabKey>("in-progress");
  const { user } = useAppSelector((state) => state.auth);
  const courseDialog = useDialog();

  const onTabChange = useCallback((value: TabKey) => {
    setTab(value);
  }, []);

  return (
    <>
      <Stack
        sx={{
          padding: 4,
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
              gap: 0.5,
            }}
          >
            <Typography variant="h5" fontWeight={800}>
              My courses
            </Typography>
            <Typography>
              {user?.role === "teacher"
                ? "Manage the courses you're teaching and create new learning experiences for your students."
                : "All your learning in one place! See the courses you're taking"}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={courseDialog.handleOpen}
            >
              Add new course
            </Button>
          </Box>
        </Box>
        <Tabs
          value={tab}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={(_, value) => onTabChange(value)}
        >
          <Tab value="in-progress" label="In progress" />
          <Tab value="completed" label="Completed" />
        </Tabs>
        {tab === "in-progress" && <InProgressSection />}
        {tab === "completed" && <CompletedSection />}
      </Stack>
      <AddCourseDialog
        onClose={courseDialog.handleClose}
        open={courseDialog.open}
      />
    </>
  );
};

export default MyCoursePage;
