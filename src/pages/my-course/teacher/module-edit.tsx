import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useDialog } from "@/hooks/use-dialog";
import useQuery from "@/hooks/use-query";
import SaveChangeDialog from "@/sections/my-course/save-change-dialog";
import {
  setIsChange,
  updateLesson,
  updateModule,
} from "@/stores/course/course.slice";
import { grey } from "@/theme/color";
import { initialLesson } from "@/types/lesson";
import { initialModule, ModuleProps } from "@/types/module";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModuleEditPage = () => {
  const { modules, course, isChange } = useAppSelector((state) => state.course);
  const [originalModule, setOriginalModule] =
    useState<ModuleProps>(initialModule);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useQuery();
  const saveChangeDialog = useDialog();

  const module = useMemo(
    () =>
      (modules || []).find((m) => m.id === query.get("id")) || initialModule,
    [modules, query],
  );

  const handleGoBack = useCallback(() => {
    if (isChange) {
      saveChangeDialog.handleOpen();
    } else {
      navigate("/my-course/add-course");
    }
  }, [isChange, navigate, saveChangeDialog]);

  const handleNameChange = useCallback(
    (name: string) => {
      if (!isChange) {
        dispatch(setIsChange(true));
      }
      const updated = (modules || []).map((m) => {
        if (m.id === module.id) {
          return { ...m, name };
        }
        return m;
      });
      dispatch(updateModule(updated));
    },
    [dispatch, isChange, module.id, modules],
  );

  const handleNameLessonChange = useCallback(
    (id: string, name: string) => {
      const updatedLesson = module.lessons.find((l) => l.id === id);
      console.log(updateLesson);
      if (updatedLesson) {
        dispatch(
          updateLesson({
            lesson_id: id,
            module_id: module.id,
            lesson: { ...updatedLesson, name },
          }),
        );
      }
    },
    [dispatch, module.id, module.lessons],
  );

  const handleAddLesson = useCallback(() => {
    if (!isChange) {
      dispatch(setIsChange(true));
    }
    const updated = (modules || []).map((m) => {
      if (m.id === module.id) {
        return { ...m, lessons: [...m.lessons, initialLesson] };
      }
      return m;
    });
    dispatch(updateModule(updated));
  }, [dispatch, isChange, module.id, modules]);

  const handleDeleteLesson = useCallback(
    (id: string) => {
      if (!isChange) {
        dispatch(setIsChange(true));
      }
      const updated = (modules || []).map((m) => {
        if (m.id === module.id) {
          return {
            ...module,
            lessons: module.lessons.filter((lesson) => lesson.id !== id),
          };
        }
        return m;
      });
      dispatch(updateModule(updated));
    },
    [dispatch, isChange, module, modules],
  );

  const handleEditLesson = useCallback(
    (id: string) => {
      dispatch(setIsChange(true));
      navigate(`/my-course/edit?type=lesson&id=${id}&module_id=${module.id}`);
    },
    [dispatch, module.id, navigate],
  );

  useEffect(() => {
    const module = (modules || []).find((m) => m.id === query.get("id"));
    if (module) {
      setOriginalModule(module);
    }
  }, [modules, query]);

  useEffect(() => {
    if (!modules || !query || !query.get) {
      navigate("/my-course");
    }
  }, [modules, navigate, query]);

  return (
    <Stack gap={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 2,
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography color="primary.main" sx={{ fontWeight: 600 }}>
            Go back to previous page
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 7.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography color="primary.main" sx={{ fontWeight: 600, fontSize: 24 }}>
          {course?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            Course ID: {course?.id}
          </Typography>
          <Typography sx={{ fontWeight: 600 }}></Typography>
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 7.5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          placeholder="Enter module name"
          value={module.name}
          sx={{
            width: 600,
          }}
          onChange={(e) => handleNameChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Typography color="black">Module name: </Typography>
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
          Lessons ({module.lessons.length})
        </Typography>
        <Grid2 container spacing={2}>
          {module.lessons.map((lesson, index) => (
            <Grid2 size={3}>
              <Box
                sx={{
                  border: 1,
                  borderColor: grey[400],
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "space-between",
                  padding: 2,
                  position: "relative",
                  gap: 2,
                }}
              >
                <Grid2
                  container
                  sx={{
                    width: "100%",
                  }}
                >
                  <Grid2
                    size={2.5}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Lesson {index + 1}: </Typography>
                  </Grid2>
                  <Grid2 size={9.5}>
                    <TextField
                      onChange={(e) =>
                        handleNameLessonChange(lesson.id, e.target.value)
                      }
                      value={lesson.name}
                      size="small"
                      fullWidth
                    />
                  </Grid2>
                </Grid2>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handleEditLesson(lesson.id)}
                  >
                    Edit lesson
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Delete lesson
                  </Button>
                </Box>
              </Box>
            </Grid2>
          ))}
          <Grid2 size={3}>
            <Box
              onClick={handleAddLesson}
              sx={{
                flexGrow: 1,
                border: 1,
                borderColor: grey[400],
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "fit-content",
                padding: 2,
                gap: 1,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: grey[100],
                  border: 2,
                },
              }}
            >
              <Plus size={20} />
              <Typography>Add new lessson</Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      <SaveChangeDialog
        type="module"
        module={module}
        open={saveChangeDialog.open}
        onClose={saveChangeDialog.handleClose}
        originalModule={originalModule}
      />
    </Stack>
  );
};

export default ModuleEditPage;
