import useLessonContext from "@/hooks/contexts/use-lesson-context";
import useModuleContext from "@/hooks/contexts/use-module-context";
import { grey } from "@/theme/color";
import { LessonDetailProps } from "@/types/lesson";
import { initialModuleDetail, ModuleDetailProps } from "@/types/module";
import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface CourseContentMainProps {
  courseName: string;
  moduleId: ModuleDetailProps["id"];
}

const CourseContentMain = ({
  courseName,
  moduleId,
}: CourseContentMainProps) => {
  const [lessons, setLessons] = useState<Array<LessonDetailProps>>([]);
  const [module, setModule] = useState<ModuleDetailProps>(initialModuleDetail);
  const [lesson, setLesson] = useState<Partial<LessonDetailProps>>({});
  const { getLessons, getLessonById } = useLessonContext();
  const { getModuleById } = useModuleContext();

  const handleClickModule = useCallback(() => {
    setLesson({});
  }, []);

  const previousLesson = useMemo(() => {
    const index = lessons.findIndex((item) => item.id === lesson.id);
    if (index === 0) {
      return "";
    }
    return lessons[index - 1];
  }, [lesson.id, lessons]);

  const nextLesson = useMemo(() => {
    const index = lessons.findIndex((item) => item.id === lesson.id);
    if (index === lessons.length - 1) {
      return "";
    }
    return lessons[index + 1];
  }, [lesson.id, lessons]);

  const handleClickLesson = useCallback(
    async (lessonId: string) => {
      const lesson = await getLessonById(lessonId);
      setLesson(lesson);
    },
    [getLessonById],
  );

  const onClickNextLesson = useCallback(() => {
    if (!nextLesson) {
      handleClickModule();
      return;
    }
    handleClickLesson(nextLesson.id);
  }, [nextLesson, handleClickLesson, handleClickModule]);

  const onClickPreviousLesson = useCallback(() => {
    if (!previousLesson) {
      handleClickModule();
      return;
    }
    handleClickLesson(previousLesson.id);
  }, [previousLesson, handleClickLesson, handleClickModule]);

  useEffect(() => {
    if (!moduleId) return;
    const fetchLessons = async () => {
      const lessons = await getLessons(moduleId);
      setLessons(lessons);
    };
    const fetchModule = async () => {
      const module = await getModuleById(moduleId);
      setModule(module);
    };
    setLesson({});
    fetchModule();
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  return (
    <Stack
      sx={{
        padding: 2,
      }}
    >
      <Breadcrumbs
        separator={<ChevronRight size={20} />}
        aria-label="breadcrumb"
        sx={{
          color: "primary.main",
          marginBottom: 2,
        }}
      >
        {[
          <Typography>{courseName}</Typography>,
          <Button
            onClick={handleClickModule}
            sx={{
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {module.name}
          </Button>,
          lesson.id && <Typography>{lesson.name}</Typography>,
        ]}
      </Breadcrumbs>
      {lesson.id ? (
        <>
          <Box>
            <div
              dangerouslySetInnerHTML={{ __html: lesson.content || "" }}
              style={{
                width: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              startIcon={<ChevronLeft size={20} />}
              onClick={onClickPreviousLesson}
            >
              {previousLesson ? previousLesson.name : "Module"}
            </Button>
            <Button
              endIcon={<ChevronRight size={20} />}
              onClick={onClickNextLesson}
            >
              {nextLesson ? nextLesson.name : "Module"}
            </Button>
          </Box>
        </>
      ) : (
        <Stack>
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            {module.name}
          </Typography>
          <Typography
            sx={{
              color: grey[600],
              marginTop: 1,
            }}
          >
            {module.description
              ? module.description
              : "No description is available"}
          </Typography>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              marginTop: 1,
              gap: 1,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 18, marginLeft: 1 }}>
              Lessons
            </Typography>
            {lessons.map((lesson, index) => (
              <Button
                key={lesson.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "flex-start",
                  width: "fit-content",
                  padding: 1,
                  color: "black",
                }}
                onClick={() => handleClickLesson(lesson.id)}
              >
                <Typography>
                  {index + 1}. {lesson.name}
                </Typography>
              </Button>
            ))}
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default CourseContentMain;
