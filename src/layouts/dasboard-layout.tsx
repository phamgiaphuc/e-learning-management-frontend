import useBreakpointContext from "@/hooks/use-breakpoint-context";
import DashboardNavBar from "@/sections/dashboard/dashboard-nav-bar";
import DashboardSideNav from "@/sections/dashboard/dashboard-side-nav";
import DashboardSideNavDrawer from "@/sections/dashboard/dashboard-side-nav-drawer";
import { routes } from "@/types/dashboard/side-nav-routes";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { isMobileView, isTabletView } = useBreakpointContext();
  const { pathname } = useLocation();
  const [openDbDrawer, setOpenDbDrawer] = useState<boolean>(false);

  const onOpenDbSideNavDrawer = useCallback(() => setOpenDbDrawer(true), []);
  const onCloseDbSideNavDrawer = useCallback(() => setOpenDbDrawer(false), []);

  useEffect(() => {
    if (!(isMobileView || isTabletView)) {
      onCloseDbSideNavDrawer();
    }
  }, [isMobileView, isTabletView, onCloseDbSideNavDrawer]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      {!(isMobileView || isTabletView) && (
        <DashboardSideNav routes={routes} pathname={pathname} />
      )}
      <Box
        sx={{
          position: "relative",
          padding: 2,
          left: isMobileView || isTabletView ? 0 : 284,
          width: `calc(100% - ${isMobileView || isTabletView ? 0 : 284}px)`,
        }}
      >
        <DashboardNavBar
          pathname={pathname}
          onOpenDbSideNavDrawer={onOpenDbSideNavDrawer}
        />
        <Outlet />
        <DashboardSideNavDrawer
          openDbDrawer={openDbDrawer}
          pathname={pathname}
          onCloseDbSideNavDrawer={onCloseDbSideNavDrawer}
        />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
