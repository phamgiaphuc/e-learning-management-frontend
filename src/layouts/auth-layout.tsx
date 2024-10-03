import HCMIUIcon from "@/assets/icons/hcmiu.png";
import AuthHeroImage from "@/assets/images/auth-hero-image.svg";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { ArrowLeft, Home } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  // Variables and states
  const location = useLocation();
  const navigate = useNavigate();
  const { isTabletView, isMobileView } = useBreakpointContext();

  const authPathname = useMemo(() => {
    if (location.pathname.includes("signin")) {
      return "signin";
    }
    if (location.pathname.includes("signup")) {
      return "signup";
    }
    if (location.pathname.includes("forgot-password")) {
      return "forgot-password";
    }
    if (location.pathname.includes("verify")) {
      return "verify";
    }
    return "default";
  }, [location.pathname]);

  const formTitle = useMemo(() => {
    if (authPathname === "signin") {
      return "Sign in to your ELearning account!";
    }
    if (authPathname === "signup") {
      return "Join our community now!";
    }
    if (authPathname === "forgot-password") {
      return "Forgot password";
    }
    if (authPathname === "verify") {
      return "OTP Verification";
    }
    return "Default title";
  }, [authPathname]);

  return (
    <Grid2
      container
      sx={{
        height: "100vh",
        width: "100vw",
      }}
      padding={4}
      columnSpacing={4}
    >
      {!isMobileView && (
        <Grid2
          size={{
            xs: 6,
          }}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 8,
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <img
            src={AuthHeroImage}
            loading="eager"
            width={isTabletView ? "256px" : ""}
            alt="auth-hero-image"
          />
          <Stack
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              color="white"
              variant={isTabletView ? "h4" : "h2"}
              fontWeight={800}
            >
              Study Toghether
            </Typography>
            <Typography color="white" variant={isTabletView ? "body1" : "h6"}>
              Make your study easier with our study app
            </Typography>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              top: 32,
              left: 32,
            }}
          >
            <Box
              component={Link}
              to="/"
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
                }}
              >
                <Typography color="white" variant="h6" fontWeight={800}>
                  Scholaro
                </Typography>
                <Typography fontSize={12} color="grey.400">
                  A Elearning Management Platform
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid2>
      )}
      <Grid2
        size={{
          xs: 12,
          md: 6,
        }}
        paddingY={4}
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          marginBottom={4}
          justifyContent="space-between"
          width="100%"
        >
          <div
            style={{
              marginBottom: "1rem",
            }}
          >
            {authPathname === "forgot-password" && (
              <Button
                size="large"
                variant="text"
                startIcon={<ArrowLeft size={20} />}
                sx={{
                  color: "black",
                }}
                onClick={() => navigate("/signin")}
              >
                Back
              </Button>
            )}
            {isMobileView && ["signin", "signup"].includes(authPathname) && (
              <Button
                size="large"
                variant="text"
                startIcon={<Home size={20} />}
                sx={{
                  color: "black",
                }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            )}
          </div>
          <Box
            display="flex"
            flexDirection={isMobileView ? "column" : "row"}
            alignItems={["verify"].includes(authPathname) ? "center" : "start"}
            justifyContent={["verify"].includes(authPathname) ? "center" : ""}
          >
            {isMobileView && (
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
                  }}
                >
                  <Typography
                    variant={isMobileView ? "h5" : "h4"}
                    fontWeight={800}
                  >
                    Scholaro
                  </Typography>
                  <Typography fontSize={12} color="grey.600">
                    A Elearning Management Platform
                  </Typography>
                </Box>
              </Box>
            )}
            <Typography variant={isMobileView ? "h5" : "h4"} fontWeight={800}>
              {formTitle}
            </Typography>
          </Box>
        </Box>
        <Outlet />
      </Grid2>
    </Grid2>
  );
};

export default AuthLayout;
