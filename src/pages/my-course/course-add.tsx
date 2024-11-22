import { useAppSelector } from "@/hooks/use-app-selector";
import { grey } from "@/theme/color";
import {
  Breadcrumbs,
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import { ChevronRight, Download, Plus, Telescope } from "lucide-react";
import { useDropzone } from "react-dropzone";
import ModuleList from "@/sections/my-course/module-list";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { resetCourse } from "@/stores/course/course.slice";
import { initialNewCourse, newCourseSchema } from "@/types/course";

const CourseAddPage = () => {
  const { course } = useAppSelector((state) => state.course);
  const { getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialNewCourse,
    validationSchema: newCourseSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleClose = useCallback(() => {
    dispatch(resetCourse());
    navigate("/my-course");
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!course) {
      navigate("/my-course");
    } else {
      formik.setValues({
        name: course.name,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        level: course.level,
        slug: course.slug,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, navigate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ padding: 2, gap: 2 }}>
        <Breadcrumbs separator={<ChevronRight size={20} />}>
          {[
            <Typography
              color="text.primary"
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                },
              }}
              onClick={handleClose}
            >
              My course
            </Typography>,
            <Typography
              color="primary"
              sx={{
                fontWeight: 600,
              }}
            >
              {formik.values.name || "Project's name"}
            </Typography>,
          ]}
        </Breadcrumbs>
        <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "84%",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                {formik.values.name || "Project's name"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                border: 1,
                borderColor: grey[400],
                borderRadius: 2,
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginLeft: 0.5,
                }}
              >
                Basic course info
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ marginLeft: 0.5 }}>Name</Typography>
                <TextField
                  type="text"
                  placeholder="Enter course name"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ marginLeft: 0.5 }}>Slug</Typography>
                <TextField
                  type="text"
                  placeholder="Enter course slug"
                  value={formik.values.slug}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ marginLeft: 0.5 }}>
                  Description ({formik.values.description.length}/300)
                </Typography>
                <TextField
                  placeholder="Enter course name"
                  value={formik.values.description}
                  multiline
                  rows={4}
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 300,
                      },
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ marginLeft: 0.5 }}>
                  Course thumbnail
                </Typography>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: 1,
                    borderColor: grey[400],
                    borderRadius: 2,
                    height: 128,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <input {...getInputProps()} />
                  <Download />
                  <Typography>
                    Click here to upload or drag and drop the image
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                border: 1,
                borderColor: grey[400],
                borderRadius: 2,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginLeft: 0.5,
                  }}
                >
                  Course content
                </Typography>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Plus size={20} />}
                >
                  Add new section
                </Button>
              </Box>
              <ModuleList />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "15%",
              position: "fixed",
              right: 16,
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                padding: 2,
                display: "flex",
                gap: 2,
                borderRadius: 2,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Preview course</Typography>
                <Typography variant="body2">
                  View how other see your course
                </Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  height: "fit-content",
                  paddingX: 4,
                  borderRadius: 2,
                }}
                startIcon={<Telescope size={20} />}
              >
                Preview
              </Button>
            </Paper>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: "white",
                border: 1,
                borderColor: grey[400],
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 2,
                alignItems: "start",
              }}
            >
              <Stack gap={0.5}>
                <Typography sx={{ fontWeight: 600 }}>Choose level</Typography>
                <Typography variant="body2">
                  Choose the level for the course
                </Typography>
              </Stack>
              <TextField
                select
                fullWidth
                size="small"
                value={formik.values.level}
              >
                <MenuItem value="beginner" key="beginner">
                  Beginner
                </MenuItem>
                <MenuItem value="intermediate" key="intermediate">
                  Intermediate
                </MenuItem>
                <MenuItem value="advanced" key="advanced">
                  Advanced
                </MenuItem>
              </TextField>
            </Paper>
          </Box>
        </Box>
      </Stack>
    </form>
  );
};

export default CourseAddPage;
