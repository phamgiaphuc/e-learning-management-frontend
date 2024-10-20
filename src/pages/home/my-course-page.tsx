import CompletedSection from "@/sections/my-course/completed-section";
import InProgressSection from "@/sections/my-course/in-progress-section";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useState } from "react";

type TabKey = "in-progress" | "completed";

const MyCoursePage = () => {
  const [tab, setTab] = useState<TabKey>("in-progress");

  const onTabChange = useCallback((value: TabKey) => {
    setTab(value);
  }, []);

  return (
    <Stack
      sx={{
        padding: 4,
        gap: 2,
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
          My course
        </Typography>
        <Typography>
          All your learning in one place! See the courses you're taking
        </Typography>
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
  );
};

export default MyCoursePage;
