import { useAppSelector } from "@/hooks/use-app-selector";
import { grey } from "@/theme/color";
import { Breadcrumbs, Stack, Typography, Box, TextField } from "@mui/material";
import { ChevronRight, Download } from "lucide-react";
import { useDropzone } from "react-dropzone";
import ModuleList from "@/sections/my-course/module-list";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { resetCourse, setThumbnailUrl } from "@/stores/course/course.slice";
import {
  initialNewCourse,
  NewCourseProps,
  newCourseSchema,
} from "@/types/course";
import CourseSideForm from "@/sections/my-course/course-side-form";
import useImageContext from "@/hooks/contexts/use-image-context";

const CourseAddPage = () => {
  const { course } = useAppSelector((state) => state.course);
  const { uploadImage } = useImageContext();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      handleUploadImage(acceptedFiles[0]);
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<NewCourseProps>({
    initialValues: initialNewCourse,
    validationSchema: newCourseSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleUploadImage = async (image: File) => {
    const { imageUrl } = await uploadImage(image);
    dispatch(setThumbnailUrl(imageUrl));
    formik.setFieldValue("thumbnailUrl", imageUrl);
  };

  const handleClose = useCallback(() => {
    dispatch(resetCourse());
    navigate("/my-course");
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!course) {
      navigate("/my-course");
    } else {
      formik.setValues({
        id: course.id,
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
        <Box sx={{ display: "flex", gap: 2, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "84%",
              gap: 2,
            }}
          >
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
                  name="slug"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.slug && Boolean(formik.errors.slug)}
                  helperText={formik.touched.slug && formik.errors.slug}
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
                  Description ({formik.values.description.length}/500)
                </Typography>
                <TextField
                  placeholder="Enter course name"
                  value={formik.values.description}
                  multiline
                  rows={5}
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 500,
                      },
                    },
                  }}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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
                    overflow: "hidden",
                    pơsition: "relative",
                  }}
                >
                  <input {...getInputProps()} />
                  {formik.values.thumbnailUrl ? (
                    <>
                      <img
                        src={formik.values.thumbnailUrl}
                        alt="thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          display: "flex",
                          gap: 1,
                          padding: 2,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          borderRadius: 2,
                          color: "white",
                        }}
                      >
                        <Download />
                        <Typography>
                          Click here to upload or drag and drop the image
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Download />
                      <Typography>
                        Click here to upload or drag and drop the image
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
            <ModuleList />
          </Box>
          <CourseSideForm handleClose={handleClose} formik={formik} />
        </Box>
      </Stack>
    </form>
  );
};

export default CourseAddPage;
