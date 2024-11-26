import { GeneralDialog } from "@/components/dialog/general-dialog";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import useToast from "@/hooks/use-toast";
import { setIsChange, updateModuleById } from "@/stores/course/course.slice";
import { initialModule, ModuleProps } from "@/types/module";
import { DialogProps, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface SaveChangeDialogProps extends DialogProps {
  type: "module" | "lesson";
  module?: ModuleProps;
  originalModule?: ModuleProps;
}

const SaveChangeDialog = ({
  type,
  module,
  originalModule,
  ...props
}: SaveChangeDialogProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { successToast } = useToast();

  const handleOnConfirm = useCallback(async () => {
    dispatch(setIsChange(false));
    navigate("/my-course/add-course");
    successToast("Save changes successfully");
  }, [dispatch, navigate, successToast]);

  const handleOnCancel = useCallback(async () => {
    if (type === "module" && module) {
      dispatch(
        updateModuleById({
          id: module.id,
          module: originalModule || initialModule,
        }),
      );
    }
    dispatch(setIsChange(false));
    navigate("/my-course/add-course");
  }, [dispatch, module, navigate, originalModule, type]);

  return (
    <GeneralDialog
      onConfirm={handleOnConfirm}
      onCancel={handleOnCancel}
      {...props}
      title="Save new changes"
      maxWidth="sm"
      successText="Save successfully"
      confirmText="Save"
      cancelBtnHidden={false}
      color="primary"
    >
      <Stack
        sx={{
          marginTop: 0.5,
        }}
      >
        <Typography>Are you sure to save changes to the content?</Typography>
      </Stack>
    </GeneralDialog>
  );
};

export default SaveChangeDialog;
