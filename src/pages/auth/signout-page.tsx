import { grey } from "@/theme/color";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  const [isOpen, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      navigate("/");
    }
  }, [isOpen, navigate]);

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "400px",
            alignItems: "center",
            textAlign: "center",
            padding: "1.5rem",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle id="logout-dialog-title">{"Welcome back"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Log in to discover a world of new possibilities.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: "100%" }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Button
              sx={{
                width: "90%",
                backgroundColor: "primary.main",
                color: "#fff",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/signin");
              }}
            >
              Log in
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "90%",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up
            </Button>
            <Button
              sx={{
                width: "90%",
                textDecoration: "underline",
                color: grey[500],
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Stay logged out
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SignOutPage;
