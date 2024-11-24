import { useAppSelector } from "@/hooks/use-app-selector";
import { useDialog } from "@/hooks/use-dialog";
import useQuery from "@/hooks/use-query";
import SaveChangeDialog from "@/sections/my-course/save-change-dialog";
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
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModuleEditPage = () => {
  const [module, setModule] = useState<ModuleProps>(initialModule);
  const { modules, course } = useAppSelector((state) => state.course);
  const [isChange, setIsChange] = useState<boolean>(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const query = useQuery();
  const saveChangeDialog = useDialog();

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
        setIsChange(true);
      }
      return setModule({ ...module, name });
    },
    [isChange, module],
  );

  const handleAddLesson = useCallback(() => {
    if (!isChange) {
      setIsChange(true);
    }
    const updated = {
      ...module,
      lessons: [...module.lessons, initialLesson],
    };
    setModule(updated);
  }, [isChange, module]);

  useEffect(() => {
    const module =
      (modules || []).find((m) => m.id === query.get("id")) || initialModule;
    setModule(module);
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
                    <TextField value={lesson.name} size="small" fullWidth />
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
                  <Button variant="outlined" color="primary" fullWidth>
                    Edit lesson
                  </Button>
                  <Button variant="outlined" color="error" fullWidth>
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
        open={saveChangeDialog.open}
        onClose={saveChangeDialog.handleClose}
      />
    </Stack>
  );
};

export default ModuleEditPage;
