import HCMIUIcon from "@/assets/icons/hcmiu.png";
import LucideIcon from "@/components/icons/lucide-icon";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { RouteProps } from "@/types/dashboard/side-nav-routes";
import { Box, List, ListItemButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface DashboardSideNavProps {
  routes: Array<RouteProps>;
  pathname: string;
}

const DashboardSideNav = ({ routes, pathname }: DashboardSideNavProps) => {
  const { isMobileView, isTabletView } = useBreakpointContext();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    !(isMobileView || isTabletView) && (
      <Box
        sx={{
          display: "flex",
          width: "300px",
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
          <Box
            component={Link}
            to="/dashboard"
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={HCMIUIcon} alt="hcmiu-logo" height={36} width={36} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 1,
              }}
            >
              <Typography color="white" variant="h6" fontWeight={800}>
                Scholaro
              </Typography>
              <Typography fontSize={12} color={theme.palette.grey[400]}>
                A Elearning Management Platform
              </Typography>
            </Box>
          </Box>
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
                  <LucideIcon
                    name={route.icon}
                    size={18}
                    color={pathname.includes(route.href) ? "#FF9600" : "white"}
                  />
                  <Typography
                    fontWeight={500}
                    color={pathname.includes(route.href) ? "#FF9600" : "white"}
                  >
                    {route.name}
                  </Typography>
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
