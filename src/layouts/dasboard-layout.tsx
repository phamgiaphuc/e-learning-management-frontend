import DashboardSideNav from "@/components/navs/dashboard-side-nav";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { routes } from "@/types/dashboard/side-nav-routes";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Bell, Menu, MessageCircle, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { isMobileView, isTabletView } = useBreakpointContext();
  const { pathname } = useLocation();
  const page = useMemo(
    () => routes.find((route) => pathname.includes(route.href)),
    [pathname],
  );
  const [openDbDrawer, setOpenDbDrawer] = useState<boolean>(false);

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
              gap: 2,
            }}
          >
            {(isMobileView || isTabletView) && (
              <IconButton onClick={onOpenDbDrawerChange}>
                <Menu color="#1B1E31" />
              </IconButton>
            )}
            <Typography variant="h4" fontWeight={800}>
              {page?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
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
            <Avatar alt="avatar" src="https://avatar.iran.liara.run/public" />
          </Box>
        </Box>
        <Outlet />
        <Drawer
          open={openDbDrawer}
          onClose={() => setOpenDbDrawer(false)}
          PaperProps={{
            sx: {
              width: "300px",
            },
          }}
        ></Drawer>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
