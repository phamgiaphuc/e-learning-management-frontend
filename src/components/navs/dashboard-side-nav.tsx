import LucideIcon from "@/components/icons/lucide-icon";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { RouteProps } from "@/types/dashboard/side-nav-routes";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DashboardSideNavProps {
  routes: Array<RouteProps>;
  pathname: string;
}

const DashboardSideNav = ({ routes, pathname }: DashboardSideNavProps) => {
  const { isMobileView, isTabletView } = useBreakpointContext();
  const navigate = useNavigate();

  return (
    !(isMobileView || isTabletView) && (
      <Box
        sx={{
          display: "flex",
          width: "280px",
          height: "100vh",
          padding: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            flexGrow: 1,
            borderRadius: "12px",
            padding: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
          }}
        >
          <Typography
            color="white"
            variant="h5"
            fontWeight={800}
            marginBottom={1}
            textAlign="center"
          >
            Scholaro
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <List>
              {routes.map((route, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    color: "white",
                    gap: 1,
                    borderRadius: "6px",
                    ":hover": {
                      backgroundColor: "#39426f",
                    },
                    backgroundColor: pathname.includes(route.href)
                      ? "#39426f"
                      : "",
                    marginBottom: 0.5,
                    boxShadow: pathname.includes(route.href) ? 2 : 0,
                  }}
                  onClick={() => navigate(route.href)}
                >
                  <LucideIcon name={route.icon} size={20} />
                  <Typography fontWeight={500}>{route.name}</Typography>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    )
  );
};
export default DashboardSideNav;
