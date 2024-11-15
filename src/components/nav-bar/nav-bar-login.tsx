import HCMIUIcon from "@/assets/icons/hcmiu.png";
import SearchBar from "@/components/inputs/search-bar";
import { grey } from "@/theme/color";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { BellIcon, CircleUserIcon, MailIcon } from "lucide-react";
import { useState } from "react";
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

const NavBarLogin = () => {
  const [anchorEl, setAncholEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setAncholEl(e.currentTarget);
  };

  const handleClose = () => {
    setAncholEl(null);
  };

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
              <NavBarLink>Course</NavBarLink>
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
          {/* Three right-side buttons */}
          <Box
            sx={{
              color: "#1575E3",
              alignItems: "center",
              display: "flex",
              gap: 3,
              marginLeft: 4,
              marginRight: 3,
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
              <IconButton onClick={handleClick} color="inherit">
                <CircleUserIcon
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
              </IconButton>
            </Tooltip>
            {/* Profile Dropdown Menu */}
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signout");
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarLogin;
