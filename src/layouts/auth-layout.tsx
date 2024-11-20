import HCMIUIcon from "@/assets/icons/hcmiu.png";
import AuthBackground from "@/assets/images/auth-background.png";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { ArrowLeft, Home } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  // Variables and states
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileView } = useBreakpointContext();

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
    if (location.pathname.includes("recover-password")) {
      return "recover-password";
    }
    return "default";
  }, [location.pathname]);

  const formTitle = useMemo(() => {
    if (authPathname === "signin") {
      return "Log in";
    }
    if (authPathname === "signup") {
      return "Sign up";
    }
    if (authPathname === "forgot-password") {
      return "Forgot password";
    }
    if (authPathname === "verify") {
      return "OTP Verification";
    }
    if (authPathname === "recover-password") {
      return "Recover password";
    }
    return "Default title";
  }, [authPathname]);

  return (
    <Grid2
      container
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #FFFEF9 50%, #1575E3 50%)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <img
        src={AuthBackground}
        alt="background"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "110%",
        }}
      />
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
            <Typography color="secondary.main" variant="h6" fontWeight={800}>
              Scholaro
            </Typography>
            <Typography fontSize={12} color="grey.400">
              A E-learning Management Platform
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems={["verify"].includes(authPathname) ? "center" : "start"}
        justifyContent={["verify"].includes(authPathname) ? "center" : ""}
        margin="auto"
        marginTop={["signup"].includes(authPathname) ? "2rem" : "auto"}
        maxWidth="550px"
        width="100%"
        padding="2rem"
        borderRadius="30px"
        boxShadow="0px 4px 35px rgba(0, 0, 0, 0.08)"
        bgcolor="white"
        zIndex="1"
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
                color: (theme) =>
                  theme.palette.mode === "light" ? "black" : "white",
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
                  A E-learning Management Platform
                </Typography>
              </Box>
            </Box>
          )}

          <Typography
            variant={isMobileView ? "h5" : "h4"}
            fontWeight={600}
            color="#000000"
            marginBottom={2}
            lineHeight="1.2"
          >
            {formTitle}
          </Typography>
        </Box>
        <Outlet />
      </Box>
    </Grid2>
  );
};

export default AuthLayout;
