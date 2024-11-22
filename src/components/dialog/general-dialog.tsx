import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogProps,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ButtonTypeMap } from "@mui/material/Button";
import { X } from "lucide-react";

type btnProps = "confirm" | "cancel" | "close";

export function GeneralDialog({
  title,
  confirmText,
  children,
  confirmIcon,
  color,
  cancelText,
  maxWidth,
  disabledAction = false,
  disabledConfirmBtn = false,
  disabledClose = [],
  cancelBtnHidden = true,
  ...dialogProps
}: DialogProps & {
  title?: string;
  children?: React.ReactNode;
  confirmIcon?: React.ReactNode;
  color?: ButtonTypeMap["props"]["color"];
  successText: string;
  confirmText?: string;
  cancelText?: string;
  disabledAction?: boolean;
  disabledConfirmBtn?: boolean;
  disabledClose?: Array<btnProps>;
  cancelBtnHidden?: boolean;
  onConfirm: () => Promise<void>;
}) {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || "xs"}
      {...dialogProps}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          ...dialogProps.PaperProps?.sx,
        },
      }}
    >
      <DialogTitle
        sx={{
          paddingX: 2,
          paddingY: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            position: "relative",
          }}
        >
          <DialogTitle
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {title}
          </DialogTitle>
          <IconButton
            onClick={(e) =>
              !disabledClose.includes("close") &&
              dialogProps.onClose?.(e, "escapeKeyDown")
            }
            sx={{
              color: "black",
              position: "absolute",
              right: 0,
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 2,
        }}
      >
        {children}
      </DialogContent>
      {!disabledAction && (
        <DialogActions
          sx={{
            padding: 2,
          }}
        >
          {!cancelBtnHidden && (
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => {
                !disabledClose.includes("cancel") &&
                  dialogProps.onClose?.(e, "escapeKeyDown");
              }}
            >
              {cancelText || "Cancel"}
            </Button>
          )}
          <Button
            variant="contained"
            color={color}
            disabled={disabledConfirmBtn}
            startIcon={confirmIcon || null}
            size="large"
            onClick={async (e) => {
              await dialogProps.onConfirm();
              if (!disabledClose.includes("confirm")) {
                dialogProps.onClose?.(e, "escapeKeyDown");
              }
            }}
          >
            {confirmText || "Submit"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
