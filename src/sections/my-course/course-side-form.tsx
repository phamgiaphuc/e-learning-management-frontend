import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateCourse } from "@/stores/course/course.slice";
import { grey } from "@/theme/color";
import { NewCourseProps } from "@/types/course";
import {
  Stack,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import { FormikProps } from "formik";
import { Telescope } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface CourseSideFormProps {
  handleClose: () => void;
  formik: FormikProps<NewCourseProps>;
}

const CourseSideForm = ({ handleClose, formik }: CourseSideFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePreview = useCallback(() => {
    dispatch(updateCourse(formik.values));
    navigate("/my-course/preview?type=course");
  }, [dispatch, formik.values, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "15%",
        position: "fixed",
        top: 126,
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
          onClick={handlePreview}
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
          name="level"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.level && Boolean(formik.errors.level)}
          helperText={formik.touched.level && formik.errors.level}
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
  );
};

export default CourseSideForm;
