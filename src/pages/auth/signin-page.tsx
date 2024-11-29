import FacebookLogo from "@/assets/icons/facebook-logo.svg";
import GoogleLogo from "@/assets/icons/google-logo.svg";
import useAuthContext from "@/hooks/contexts/use-auth-context";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useMetaTitle from "@/hooks/use-meta-title";
import { blue } from "@/theme/color";
import {
  initialSignInValues,
  SignInProps,
  signInSchema,
} from "@/types/auth/signin";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CircleHelp, Eye, EyeOff, Lock, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  // Variables and states
  const theme = useTheme();
  const { signIn } = useAuthContext();
  const { isTabletView, isMobileView } = useBreakpointContext();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const formik = useFormik<SignInProps>({
    validationSchema: signInSchema,
    initialValues: initialSignInValues,
    onSubmit: async (values) => {
      await signIn(values);
    },
  });

  // Actions
  const onPasswordVisibleChange = useCallback(
    () => setPasswordVisible(!passwordVisible),
    [passwordVisible],
  );

  useMetaTitle({ title: "Sign in" });

  return (
    <Stack gap={2} width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Username or account
            </Typography>
            <TextField
              autoFocus
              name="account"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                },
              }}
              type="text"
              placeholder="Enter your username or email"
              fullWidth
              value={formik.values.account}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.account && formik.errors.account)}
              helperText={formik.touched.account && formik.errors.account}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box
              display="flex"
              flexDirection="row"
              gap={0.5}
              alignItems="center"
            >
              <Typography fontSize={18} fontWeight={500}>
                Password
              </Typography>
              <Tooltip
                arrow={true}
                title="Minimum 6 characters, at least 1 letter and 1 number"
              >
                <CircleHelp size={14} cursor="pointer" />
              </Tooltip>
            </Box>
            <TextField
              name="password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onPasswordVisibleChange}>
                        {passwordVisible ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              height: 48,
            }}
          >
            <Typography fontWeight={600}>Sign in</Typography>
          </Button>
        </Stack>
      </form>
      <Box
        display="flex"
        flexDirection={isTabletView || isMobileView ? "column" : "row"}
        width="100%"
        justifyContent="space-between"
        gap={isTabletView || isMobileView ? 0.5 : 0}
      >
        <Link
          href="/forgot-password"
          color={theme.palette.mode === "light" ? "#8B2CF5" : blue[500]}
          sx={{
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/forgot-password");
          }}
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
            href="/forgot-password"
            color={theme.palette.mode === "light" ? "#8B2CF5" : blue[500]}
            sx={{
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
      <Divider>
        <Typography fontWeight={600}>Or sign in with other methods</Typography>
      </Divider>
      <Button
        variant="outlined"
        size="large"
        sx={{
          height: 48,
        }}
      >
        <Typography fontWeight={500} color="primary.main" marginRight={0.5}>
          Sign in with Google
        </Typography>
        <img src={GoogleLogo} width={24} height={24} alt="google-logo" />
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{
          height: 48,
        }}
      >
        <Typography fontWeight={500} color="primary.main" marginRight={0.5}>
          Sign in with Facebook
        </Typography>
        <img src={FacebookLogo} width={24} height={24} alt="facebook-logo" />
      </Button>
    </Stack>
  );
};

export default SignInPage;
