import LucideIcon from "@/components/icons/lucide-icon";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useScroll from "@/hooks/use-scroll";
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
  Typography,
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
        backgroundColor: scrolled ? "rgba(247, 248, 249, 0.85)" : "",
        padding: 1,
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
          <IconButton onClick={onOpenDbSideNavDrawer}>
            <LucideMenu color="#1B1E31" />
          </IconButton>
        )}
        <Typography
          variant={isMobileView || isTabletView ? "h5" : "h4"}
          fontWeight={800}
        >
          {page?.name}
        </Typography>
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
            <IconButton>
              <MessageCircle color="#1B1E31" />
            </IconButton>
            <IconButton>
              <Bell color="#1B1E31" />
            </IconButton>
          </>
        )}
        <IconButton
          size="small"
          onClick={onHandleMenuOpen}
          aria-controls={menuOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
        >
          <Avatar alt="avatar" src="https://avatar.iran.liara.run/public" />
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
                  bgcolor: "background.paper",
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
              <LucideIcon name="User" color="black" size={18} />
            </ListItemIcon>
            <Typography fontWeight={500}>Profile</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LucideIcon name="BookOpen" color="black" size={18} />
            </ListItemIcon>
            <Typography fontWeight={500}>My courses</Typography>
          </MenuItem>
          {isMobileView && (
            <>
              <MenuItem>
                <ListItemIcon>
                  <LucideIcon name="MessageCircle" color="black" size={18} />
                </ListItemIcon>
                <Typography fontWeight={500}>Notifications</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LucideIcon name="Bell" color="black" size={18} />
                </ListItemIcon>
                <Typography fontWeight={500}>Messsage</Typography>
              </MenuItem>
            </>
          )}
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LucideIcon name="Settings" color="black" size={18} />
            </ListItemIcon>
            <Typography fontWeight={500}>Settings</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LucideIcon name="LogOut" color="black" size={18} />
            </ListItemIcon>
            <Typography fontWeight={500}>Sign out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default DashboardNavBar;
