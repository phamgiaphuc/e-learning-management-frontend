import HCMIUIcon from "@/assets/icons/hcmiu.png";
import LucideIcon from "@/components/icons/lucide-icon";
import { zinc } from "@/theme/tailwind-color";
import { routes } from "@/types/dashboard/side-nav-routes";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardSideNavDrawerProps {
  pathname: string;
  openDbDrawer: boolean;
  onCloseDbSideNavDrawer: () => void;
}

const DashboardSideNavDrawer = ({
  pathname,
  openDbDrawer,
  onCloseDbSideNavDrawer,
}: DashboardSideNavDrawerProps) => {
  const navigate = useNavigate();

  return (
    <Drawer
      open={openDbDrawer}
      onClose={onCloseDbSideNavDrawer}
      elevation={8}
      PaperProps={{
        sx: {
          width: "280px",
          padding: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "background.papper" : zinc[950],
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
            <Typography variant="h6" fontWeight={800} sx={{}}>
              Scholaro
            </Typography>
            <IconButton
              sx={{
                color: "primary.main",
              }}
              onClick={onCloseDbSideNavDrawer}
            >
              <ArrowLeft size={20} />
            </IconButton>
          </Box>
          <Typography
            fontSize={12}
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "grey.600" : "grey.300",
            }}
          >
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
              gap: 2,
              borderRadius: "6px",
              backgroundColor: pathname.includes(route.href)
                ? "primary.main"
                : "",
              color: pathname.includes(route.href) ? "#FF9600" : "primary.main",
            }}
            onClick={() => {
              navigate(route.href);
              onCloseDbSideNavDrawer();
            }}
          >
            <LucideIcon name={route.icon} size={18} />
            <Typography fontWeight={500}>{route.name}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default DashboardSideNavDrawer;
