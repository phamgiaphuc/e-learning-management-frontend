import { GeneralDialog } from "@/components/dialog/general-dialog";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import useToast from "@/hooks/use-toast";
import { resetCourse, setBaseCourse } from "@/stores/course/course.slice";
import {
  DialogProps,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AddCourseDialogProps = DialogProps;

const AddCourseDialog = ({ ...props }: AddCourseDialogProps) => {
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const { errorToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleCourseNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCourseName(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      dispatch(setBaseCourse({ name: courseName, description }));
      navigate("/my-course/add");
    } catch (error) {
      errorToast(String(error));
    }
  };

  useEffect(() => {
    if (props.open) {
      dispatch(resetCourse());
      setCourseName("");
      setDescription("");
    }
  }, [dispatch, props.open]);

  return (
    <GeneralDialog
      onConfirm={handleConfirm}
      {...props}
      title="Add new course"
      maxWidth="sm"
      successText={""}
      disabledConfirmBtn={!courseName}
      confirmText="Add course"
      color="primary"
    >
      <Stack
        sx={{
          mt: 0.5,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            mb: 0.5,
            fontWeight: 500,
            marginLeft: 1,
          }}
        >
          Enter the course's name
        </Typography>
        <TextField
          value={courseName}
          placeholder="Your course's name"
          onChange={handleCourseNameChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BookOpen size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            mb: 0.5,
            fontWeight: 500,
            marginLeft: 1,
            marginTop: 1.5,
          }}
        >
          Enter the course's description ({description.length}/300)
        </Typography>
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          placeholder="Your course's description"
          slotProps={{
            input: {
              inputProps: {
                maxLength: 300,
              },
            },
          }}
        />
      </Stack>
    </GeneralDialog>
  );
};

export default AddCourseDialog;
