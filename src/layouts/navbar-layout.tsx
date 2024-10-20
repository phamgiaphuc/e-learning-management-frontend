import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import NavBarLink from "@/components/styles/navbar-components";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const NavbarLayout = () => {
  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: "white",
        justifyContent: "center",
        height: "6rem",
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            marginLeft: "2.5rem",
          }}
        >
          <img src={HCMIUIcon} alt="hcmiu-logo" height={38} width={38} />
        </IconButton>
        <Typography
          variant="h6"
          fontSize="35px"
          fontWeight={400}
          lineHeight="43px"
          sx={{ fontFamily: "Righteous, sans-serif", color: "text.primary" }}
        >
          Scholaro
        </Typography>
        <Stack direction="row" spacing={6} paddingLeft={8} paddingRight={10}>
          <NavBarLink>Homepage</NavBarLink>
          <NavBarLink>Course</NavBarLink>
          <NavBarLink>My learning</NavBarLink>
        </Stack>
        <SearchBar />

        <Stack direction="row" spacing={4} right="5%" position="absolute">
          <Button
            sx={{
              boxSizing: "border-box",
              width: "102px",
              height: "31px",
              border: "1px solid #CCCCD0",
            }}
          >
            <Typography
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              color="text.primary"
              fontFamily="Poppins"
            >
              Sign up
            </Typography>
          </Button>

          <Button
            sx={{
              boxSizing: "border-box",
              width: "102px",
              height: "31px",
              border: "1px solid text.primary",
              backgroundColor: "text.primary",
            }}
          >
            <Typography
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              color="white"
              fontFamily="Poppins"
            >
              Log in
            </Typography>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default NavbarLayout;
