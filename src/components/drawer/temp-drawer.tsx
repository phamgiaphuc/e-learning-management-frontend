import { Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";

const TempDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onToogleDrawer = (value: boolean) => setOpen(value);

  return (
    <div>
      <Button
        onClick={() => onToogleDrawer(true)}
        variant="outlined"
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "red"),
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "white" : "red",
        }}
      >
        Open drawer
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => onToogleDrawer(false)}
        PaperProps={{
          sx: {
            width: 700,
          },
        }}
      >
        <Typography>Temporary drawer</Typography>
      </Drawer>
    </div>
  );
};

export default TempDrawer;
