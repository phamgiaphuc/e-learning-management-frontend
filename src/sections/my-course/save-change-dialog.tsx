import { GeneralDialog } from "@/components/dialog/general-dialog";
import { DialogProps, Stack, Typography } from "@mui/material";

type SaveChangeDialogProps = DialogProps;

const SaveChangeDialog = ({ ...props }: SaveChangeDialogProps) => {
  return (
    <GeneralDialog
      onConfirm={async () => {}}
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
        <Typography>Are you sure to save changes?</Typography>
      </Stack>
    </GeneralDialog>
  );
};

export default SaveChangeDialog;
