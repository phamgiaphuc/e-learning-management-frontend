import ThemeModeButton from "@/components/buttons/theme-mode-button";
import LucideIcon from "@/components/icons/lucide-icon";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useScroll from "@/hooks/use-scroll";
import { grey } from "@/theme/color";
import { zinc } from "@/theme/tailwind-color";
import { routes } from "@/types/dashboard/side-nav-routes";
import {
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Bell, Menu as LucideMenu, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface DashboardNavBar {
  pathname: string;
  onOpenDbSideNavDrawer: () => void;
}

const DashboardNavBar = ({
  pathname,
  onOpenDbSideNavDrawer,
}: DashboardNavBar) => {
  const theme = useTheme();
  const { scrolled } = useScroll();
  const { isMobileView, isTabletView } = useBreakpointContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const page = useMemo(
    () => routes.find((route) => pathname.includes(route.href)),
    [pathname],
  );
  const menuOpen = Boolean(anchorEl);
  const onHandleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onHandleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 1,
        position: "sticky",
        top: isMobileView ? 8 : 16,
        zIndex: 1,
        backgroundColor: (theme) =>
          scrolled
            ? theme.palette.mode === "light"
              ? "rgba(247, 248, 249, 0.85)"
              : zinc[800]
            : "",
        paddingX: 1,
        paddingY: 0.5,
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {(isMobileView || isTabletView) && (
          <IconButton
            onClick={onOpenDbSideNavDrawer}
            sx={{
              color: "primary.main",
            }}
          >
            <LucideMenu />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography
            variant={isMobileView || isTabletView ? "h6" : "h5"}
            fontWeight={800}
          >
            {page?.name}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {!isMobileView && (
          <>
            <TextField
              placeholder="Search..."
              size="small"
              type="text"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Tooltip title="Messages" arrow>
              <IconButton
                sx={{
                  color: "primary.main",
                }}
              >
                <MessageCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" arrow>
              <IconButton
                sx={{
                  color: "primary.main",
                }}
              >
                <Bell />
              </IconButton>
            </Tooltip>
          </>
        )}
        <ThemeModeButton />
        <IconButton
          onClick={onHandleMenuOpen}
          aria-controls={menuOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
        >
          <Avatar
            alt="avatar"
            src="https://avatar.iran.liara.run/public"
            sx={{
              height: 30,
              width: 30,
            }}
          />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClick={onHandleMenuClose}
          onClose={onHandleMenuClose}
          slotProps={{
            paper: {
              elevation: 8,
              sx: {
                borderRadius: "12px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "background.paper"
                      : grey[950],
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <ListItemIcon>
              <LucideIcon
                name="User"
                size={18}
                color={theme.palette.mode === "light" ? "black" : "white"}
              />
            </ListItemIcon>
            <Typography fontWeight={500}>Profile</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LucideIcon
                name="BookOpen"
                size={18}
                color={theme.palette.mode === "light" ? "black" : "white"}
              />
            </ListItemIcon>
            <Typography fontWeight={500}>My courses</Typography>
          </MenuItem>
          {isMobileView && (
            <>
              <MenuItem>
                <ListItemIcon>
                  <LucideIcon
                    name="MessageCircle"
                    size={18}
                    color={theme.palette.mode === "light" ? "black" : "white"}
                  />
                </ListItemIcon>
                <Typography fontWeight={500}>Notifications</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LucideIcon
                    name="Bell"
                    size={18}
                    color={theme.palette.mode === "light" ? "black" : "white"}
                  />
                </ListItemIcon>
                <Typography fontWeight={500}>Messsage</Typography>
              </MenuItem>
            </>
          )}
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LucideIcon
                name="Settings"
                size={18}
                color={theme.palette.mode === "light" ? "black" : "white"}
              />
            </ListItemIcon>
            <Typography fontWeight={500}>Settings</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LucideIcon
                name="LogOut"
                size={18}
                color={theme.palette.mode === "light" ? "black" : "white"}
              />
            </ListItemIcon>
            <Typography fontWeight={500}>Sign out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default DashboardNavBar;
