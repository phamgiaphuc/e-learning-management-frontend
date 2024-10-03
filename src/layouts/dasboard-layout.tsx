import HCMIUIcon from "@/assets/icons/hcmiu.png";
import LucideIcon from "@/components/icons/lucide-icon";
import DashboardSideNav from "@/components/navs/dashboard-side-nav";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { routes } from "@/types/dashboard/side-nav-routes";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft, Bell, Menu, MessageCircle, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { isMobileView, isTabletView } = useBreakpointContext();
  const { pathname } = useLocation();
  const page = useMemo(
    () => routes.find((route) => pathname.includes(route.href)),
    [pathname],
  );
  const [openDbDrawer, setOpenDbDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  const onOpenDbDrawerChange = useCallback(
    () => setOpenDbDrawer(!openDbDrawer),
    [openDbDrawer],
  );

  useEffect(() => {
    if (!(isMobileView || isTabletView)) {
      setOpenDbDrawer(false);
    }
  }, [isMobileView, isTabletView]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <DashboardSideNav routes={routes} pathname={pathname} />
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 1,
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
              <IconButton onClick={onOpenDbDrawerChange}>
                <Menu color="#1B1E31" />
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
            <Avatar alt="avatar" src="https://avatar.iran.liara.run/public" />
          </Box>
        </Box>
        <Outlet />
        <Drawer
          open={openDbDrawer}
          onClose={() => setOpenDbDrawer(false)}
          PaperProps={{
            sx: {
              width: "280px",
              padding: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={HCMIUIcon} alt="hcmiu-logo" height={38} width={38} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 1,
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant={isMobileView || isTabletView ? "h5" : "h4"}
                  fontWeight={800}
                >
                  Scholaro
                </Typography>
                <IconButton
                  sx={{
                    color: "primary.main",
                  }}
                  onClick={() => setOpenDbDrawer(false)}
                >
                  <ArrowLeft size={20} />
                </IconButton>
              </Box>
              <Typography fontSize={12} color="grey.600">
                A Elearning Management Platform
              </Typography>
            </Box>
          </Box>
          <List>
            {routes.map((route, index) => (
              <ListItemButton
                key={index}
                sx={{
                  marginBottom: 0.5,
                  gap: 1,
                  borderRadius: "6px",
                  backgroundColor: pathname.includes(route.href)
                    ? "primary.main"
                    : "",
                  color: pathname.includes(route.href) ? "#FF9600" : "black",
                }}
                onClick={() => {
                  navigate(route.href);
                  setOpenDbDrawer(false);
                }}
              >
                <LucideIcon name={route.icon} size={18} />
                <Typography fontWeight={500}>{route.name}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
