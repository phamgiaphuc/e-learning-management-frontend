import LessonEditor from "@/components/editor/lesson-editor";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import useMetaTitle from "@/hooks/use-meta-title";
import useQuery from "@/hooks/use-query";
import useToast from "@/hooks/use-toast";
import { updateLesson } from "@/stores/course/course.slice";
import { initialLesson, LessonProps } from "@/types/lesson";
import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LessonEditPage = () => {
  const { course, modules } = useAppSelector((state) => state.course);
  const [lesson, setLesson] = useState<LessonProps>(initialLesson);
  const [content, setContent] = useState<string>("");
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { successToast } = useToast();

  const handleContentChange = useCallback((content: string) => {
    setContent(content);
  }, []);

  const handleSave = useCallback(() => {
    dispatch(
      updateLesson({
        module_id: query.get("module_id") || "",
        lesson_id: query.get("id") || "",
        lesson: {
          ...lesson,
          content,
        },
      }),
    );
    successToast("Save content successfully");
    navigate(`/my-course/edit?type=module&id=${query.get("module_id")}`);
  }, [content, dispatch, lesson, navigate, query, successToast]);

  const handleCancel = useCallback(() => {
    navigate(`/my-course/edit?type=module&id=${query.get("module_id")}`);
  }, [navigate, query]);

  useEffect(() => {
    const exsitedLesson = (modules || [])
      .find((module) => module.id === query.get("module_id"))
      ?.lessons.find((lesson) => lesson.id === query.get("id"));
    setLesson(exsitedLesson || initialLesson);
    setContent(exsitedLesson?.content || "");
  }, [modules, query]);

  useEffect(() => {
    if (!modules || !query || !query.get) {
      navigate("/my-course");
    }
  }, [modules, navigate, query]);

  useMetaTitle({ title: "Edit lessson" });

  return (
    <Stack
      sx={{
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Breadcrumbs
            separator={<ChevronRight size={20} />}
            aria-label="breadcrumb"
          >
            {[
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                My course
              </Typography>,
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                {course?.name}
              </Typography>,
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                {lesson?.name}
              </Typography>,
            ]}
          </Breadcrumbs>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "84%",
            height: "calc(100vh - 160px)",
            gap: 2,
          }}
        >
          <LessonEditor value={content} onChange={handleContentChange} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "16%",
          }}
        >
          <Button variant="contained" size="large" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Suggestions
          </Typography>
          <Typography>
            1. Think about their level: Tailor the lesson to their age,
            knowledge, and experience.
          </Typography>
          <Typography>
            2. Mix things up: People learn in different ways! Use a variety of
            methods to keep everyone engaged—whether it’s pictures, videos, or
            hands-on activities.
          </Typography>
          <Typography>
            3. Add images and diagrams: Visuals can help explain tough concepts
            and make the lesson more fun.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default LessonEditPage;
