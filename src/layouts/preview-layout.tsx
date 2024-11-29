/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "@/hooks/use-app-selector";
import useQuery from "@/hooks/use-query";
import PreivewCourse from "@/pages/my-course/preivew/preivew-course";
import PreivewModule from "@/pages/my-course/preivew/preivew-module";
import { IconButton, Stack, Box, Typography } from "@mui/material";
import _ from "lodash";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PreviewLayout = () => {
  const query = useQuery();
  const { course } = useAppSelector((state) => state.course);
  const navigate = useNavigate();

  if (!query || !query.get) {
    navigate("/my-course/add");
    return null;
  }

  const type = query.get("type");

  const title = useMemo(() => {
    if (type === "course") {
      return `Preview course - ${course?.name}`;
    }
    if (type === "module") {
      return "Preview module";
    }
    if (type === "lesson") {
      return "Preview lesson";
    }
    return "Preview";
  }, [course, type]);

  const handleGoBack = useCallback(() => {
    if (type === "course") {
      return navigate("/my-course/add");
    }
    if (type === "module") {
      return navigate("/my-course/preivew?type=course");
    }
    return navigate(-1);
  }, [navigate, type]);

  useEffect(() => {
    if (!course || _.isEmpty(course)) {
      navigate("/my-course");
    }
  }, [course, navigate]);

  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          paddingX: 2,
          paddingTop: 2,
        }}
      >
        <IconButton onClick={handleGoBack}>
          <ArrowLeft size={20} />
        </IconButton>
        <Typography color="primary.main" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {type === "course" && <PreivewCourse />}
      {type === "module" && <PreivewModule />}
    </Stack>
  );
};

export default PreviewLayout;
