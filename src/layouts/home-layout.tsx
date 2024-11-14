import NavBarLogin from "@/components/nav-bar/nav-bar-login";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const HomeLayout = () => (
  <Box>
    <NavBarLogin />
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
