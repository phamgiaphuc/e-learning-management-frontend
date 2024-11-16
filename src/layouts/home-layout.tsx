import NavBar from "@/components/nav-bar/nav-bar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const HomeLayout = () => (
  <Box>
    <NavBar />
    <Box
      sx={{
        marginTop: "5rem",
      }}
    >
      <Outlet />
    </Box>
  </Box>
);

export default HomeLayout;
