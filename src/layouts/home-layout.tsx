import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import { grey } from "@/theme/color";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

const NavBarLink = styled(Link)(() => ({
  underline: "hover",
  color: grey[500],
  fontWeight: "400",
  fontFamily: "Poppins, sans-serif",
  lineHeight: "24px",
  textDecoration: "none",
  "&:hover": {
    color: "secondary.main",
    textDecoration: "underline",
  },
}));

const AuthButton = styled(Button)<{
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}>(({ borderColor, backgroundColor, textColor }) => ({
  boxSizing: "border-box",
  width: "102px",
  height: "31px",
  border: `1px solid ${borderColor}`,
  backgroundColor: backgroundColor,
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    fontFamily: "Poppins",
    color: textColor,
  },
}));

const HomeLayout = () => {
  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "white",
        justifyContent: "center",
        height: "6rem",
        width: "100%",
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
          sx={{ fontFamily: "Righteous, sans-serif", color: "secondary.main" }}
        >
          Scholaro
        </Typography>
        <Stack direction="row" spacing={6} paddingLeft={8} paddingRight={10}>
          <NavBarLink>Homepage</NavBarLink>
          <NavBarLink>Course</NavBarLink>
          <NavBarLink>Blog</NavBarLink>
        </Stack>
        <Box>
          <SearchBar />
        </Box>

        <Stack direction="row" spacing={4} marginLeft="4rem" marginRight="4rem">
          <AuthButton
            borderColor="#CCCCD0"
            backgroundColor="white"
            textColor="#1575E3"
          >
            <Typography>Sign up</Typography>
          </AuthButton>

          <AuthButton
            borderColor="#1575E3"
            backgroundColor="#1575E3"
            textColor="white"
          >
            <Typography>Log in</Typography>
          </AuthButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default HomeLayout;
