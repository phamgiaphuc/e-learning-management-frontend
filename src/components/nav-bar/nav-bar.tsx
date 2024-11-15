import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import { useAppSelector } from "@/hooks/use-app-selector";
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
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "white",
        justifyContent: "center",
        height: "5rem",
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
              <NavBarLink>Course</NavBarLink>
              <NavBarLink>Blog</NavBarLink>
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
          <>
            {isAuthenticated ? (
              <div>User signed in</div>
            ) : (
              <>
                <AuthButton
                  borderColor="#1575E3"
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
              </>
            )}
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
