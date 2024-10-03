import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useScroll from "@/hooks/use-scroll";
import { routes } from "@/types/dashboard/side-nav-routes";
import {
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Bell, Menu, MessageCircle, Search } from "lucide-react";
import { useMemo } from "react";

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
  const page = useMemo(
    () => routes.find((route) => pathname.includes(route.href)),
    [pathname],
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 1,
        position: "sticky",
        top: 16,
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
  );
};

export default DashboardNavBar;
