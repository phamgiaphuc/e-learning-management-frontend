import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import { useAppSelector } from "@/hooks/use-app-selector";
import { authSignOut } from "@/stores/auth/auth.slice";
import { grey } from "@/theme/color";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { BellIcon, MailIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBarLink = styled(Link)(() => ({
  underline: "hover",
  color: grey[800],
  fontWeight: "400",
  lineHeight: "24px",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    color: "#1575E3",
    textDecoration: "underline",
  },
  "&.Mui-selected": {
    color: "#1575E3",
    fontWeight: "600",
    borderBottom: "2px solid #1575E3",
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
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAncholEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickProfile = (e: React.MouseEvent<HTMLElement>): void => {
    setAncholEl(e.currentTarget);
  };

  const handleCloseProfile = () => {
    setAncholEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              <Typography color="primary.main" variant="h5" fontWeight={700}>
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
              <NavBarLink href="/">Homepage</NavBarLink>
              {isAuthenticated && (
                <NavBarLink href="/course">Course</NavBarLink>
              )}
              <NavBarLink href="/about">About</NavBarLink>
              {user?.role === "teacher" && (
                <NavBarLink href="/my-course">My course</NavBarLink>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchBar />
          <>
            {isAuthenticated ? (
              <Box
                sx={{
                  color: "#1575E3",
                  alignItems: "center",
                  display: "flex",
                  gap: 2,
                }}
              >
                <Tooltip title="Notification">
                  <IconButton color="inherit">
                    <BellIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Messages">
                  <IconButton color="inherit">
                    <MailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account">
                  <Avatar
                    onClick={handleClickProfile}
                    sx={{
                      cursor: "pointer",
                      color: "primary.main",
                      bgcolor: "#fff",
                    }}
                    src={user?.userProfile.avatar}
                  />
                </Tooltip>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseProfile}
                >
                  <MenuItem onClick={handleCloseProfile}>My profile</MenuItem>
                  <MenuItem onClick={handleCloseProfile}>Settings</MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(authSignOut());
                      navigate("/signout");
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
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
              </>
            )}
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
