import useImageContext from "@/hooks/contexts/use-image-context";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setThumbnailUrl } from "@/stores/course/course.slice";
import { grey } from "@/theme/color";
import { NewCourseProps } from "@/types/course";
import { Typography, Box, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { Download } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface CourseInfoFormProps {
  formik: FormikProps<NewCourseProps>;
}

const CourseInfoForm = ({ formik }: CourseInfoFormProps) => {
  const { uploadImage } = useImageContext();
  const dispatch = useAppDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      handleUploadImage(acceptedFiles[0]);
    },
  });

  const handleUploadImage = async (image: File) => {
    const { imageUrl } = await uploadImage(image);
    dispatch(setThumbnailUrl(imageUrl));
    formik.setFieldValue("thumbnailUrl", imageUrl);
  };

  return (
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
        <Typography sx={{ marginLeft: 0.5 }}>
          Description ({formik.values.description.length}/750)
        </Typography>
        <TextField
          placeholder="Enter course description"
          value={formik.values.description}
          multiline
          rows={5}
          slotProps={{
            input: {
              inputProps: {
                maxLength: 750,
              },
            },
          }}
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography sx={{ marginLeft: 0.5 }}>Course thumbnail</Typography>
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
  );
};

export default CourseInfoForm;
