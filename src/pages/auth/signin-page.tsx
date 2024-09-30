import FacebookLogo from "@/assets/icons/facebook-logo.svg";
import GoogleLogo from "@/assets/icons/google-logo.svg";
import AuthHeroImage from "@/assets/images/auth-hero-image.svg";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  // Variables and states
  const theme = useTheme();
  const isTabletView = useMediaQuery(theme.breakpoints.down("xl"));
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // Actions
  const onPasswordVisibleChange = useCallback(
    () => setPasswordVisible(!passwordVisible),
    [passwordVisible],
  );

  console.log(isTabletView);

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
            backgroundColor: "#1B1E31",
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
            <Typography color="white" variant="h6" fontWeight={800}>
              Logo
            </Typography>
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
        <Stack width="100%" gap={2}>
          <Typography variant="h4" fontWeight={800} marginBottom={4}>
            Join our community now!
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Username or account
            </Typography>
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <User />
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Enter your username or account"
              fullWidth
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Password
            </Typography>
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onPasswordVisibleChange}>
                        {passwordVisible ? <Eye /> : <EyeOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
            />
          </Box>
          <Button
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "#1B1E31",
            }}
          >
            <Typography fontWeight={600}>Sign in</Typography>
          </Button>
          <Box
            display="flex"
            flexDirection={isTabletView ? "column" : "row"}
            width="100%"
            justifyContent="space-between"
            gap={isTabletView ? 0.5 : 0}
          >
            <Link
              color="#8B2CF5"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forget your password?
            </Link>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
              }}
            >
              <Typography>Don't have an account?</Typography>
              <Link
                color="#8B2CF5"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Link>
            </Box>
          </Box>
          <Divider>
            <Typography fontWeight={600}>
              Or sign in with other methods
            </Typography>
          </Divider>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#1B1E31",
            }}
          >
            <img src={GoogleLogo} width={24} height={24} />
            <Typography fontWeight={600} color="#1B1E31" marginLeft={0.5}>
              Sign in with Google
            </Typography>
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#1B1E31",
            }}
          >
            <img src={FacebookLogo} width={24} height={24} />
            <Typography fontWeight={600} color="#1B1E31" marginLeft={0.5}>
              Sign in with Facebook
            </Typography>
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default SignInPage;
