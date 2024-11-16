import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import { grey } from "@/theme/color";
import {
  AppBar,
  Box,
  Button,
  Link,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBarLink = styled(Link)(() => ({
  underline: "hover",
  color: grey[700],
  fontWeight: "400",
  lineHeight: "24px",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    color: "#1575E3",
    textDecoration: "underline",
  },
}));

const AuthButton = styled(Button)<{
  borderColor: string;
  backgroundColor: string;
  textColor: string;
}>(({ borderColor, backgroundColor, textColor }) => ({
  padding: "8px 16px 8px 16px",
  boxSizing: "border-box",
  border: `1px solid ${borderColor}`,
  backgroundColor: backgroundColor,
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: 16,
    color: textColor,
  },
}));

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "white",
        justifyContent: "center",
        height: "5rem",
        boxShadow:
          "0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
            }}
          >
            <Box
              component={Link}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <img src={HCMIUIcon} alt="hcmiu-logo" height={38} width={38} />
              <Typography color="secondary.main" variant="h5" fontWeight={700}>
                Scholaro
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <NavBarLink>Homepage</NavBarLink>
              <NavBarLink>About</NavBarLink>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <SearchBar />
          <AuthButton
            borderColor="#1575E3"
            backgroundColor="white"
            textColor="#1575E3"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            <Typography>Sign up</Typography>
          </AuthButton>
          <AuthButton
            borderColor="#1575E3"
            backgroundColor="#1575E3"
            textColor="white"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signin");
            }}
          >
            <Typography>Log in</Typography>
          </AuthButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
