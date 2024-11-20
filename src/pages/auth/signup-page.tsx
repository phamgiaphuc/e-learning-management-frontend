import FacebookLogo from "@/assets/icons/facebook-logo.svg";
import GoogleLogo from "@/assets/icons/google-logo.svg";
import StudentImg from "@/assets/images/student.png";
import TeacherImg from "@/assets/images/teacher.png";
import useAuthContext from "@/hooks/contexts/use-auth-context";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useMetaTitle from "@/hooks/use-meta-title";
import { blue, grey } from "@/theme/color";
import { RoleProps } from "@/types/auth/role";
import {
  initialSignUpValues,
  SignUpProps,
  signUpSchema,
} from "@/types/auth/signup";
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CircleHelp, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  // Variables and states
  const theme = useTheme();
  const { isTabletView, isMobileView } = useBreakpointContext();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [role, setRole] = useState<Partial<RoleProps>>();
  const { signUp } = useAuthContext();

  // Actions
  const onPasswordVisibleChange = useCallback(
    () => setPasswordVisible(!passwordVisible),
    [passwordVisible],
  );

  const onRoleChange = useCallback((value: RoleProps) => setRole(value), []);

  const formik = useFormik<SignUpProps>({
    validationSchema: signUpSchema,
    initialValues: initialSignUpValues,
    onSubmit: async (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;
      await signUp(rest);
    },
  });

  useMetaTitle({ title: "Sign up" });

  return (
    <Stack gap={2} width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={2}>
          <Grid2 container spacing={2}>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontSize={18} fontWeight={500}>
                  Firstname
                </Typography>
                <TextField
                  autoFocus
                  name="firstName"
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
                  placeholder="Enter your first name"
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontSize={18} fontWeight={500}>
                  Lastname
                </Typography>
                <TextField
                  name="lastName"
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
                  placeholder="Enter your last name"
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontSize={18} fontWeight={500}>
                  Email
                </Typography>
                <TextField
                  name="email"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={20} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type="text"
                  placeholder="Enter your email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontSize={18} fontWeight={500}>
                  Username
                </Typography>
                <TextField
                  name="username"
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
                  placeholder="Enter your username"
                  fullWidth
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.username && formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
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
                  type="password"
                  placeholder="Enter your password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 6,
                xs: 12,
              }}
            >
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography fontSize={18} fontWeight={500}>
                  Confirm password
                </Typography>
                <TextField
                  name="confirmPassword"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={20} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type="password"
                  placeholder="Enter your password"
                  fullWidth
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    !!(
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    )
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
              }}
            >
              <Stack gap={1}>
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={0.5}
                  alignItems="center"
                >
                  <Typography fontSize={18} fontWeight={500}>
                    Choose role
                  </Typography>
                  <Tooltip
                    arrow={true}
                    title="Choose the role based on your purpose"
                  >
                    <CircleHelp size={14} cursor="pointer" />
                  </Tooltip>
                </Box>
                <Box
                  display="flex"
                  flexDirection={isMobileView ? "column" : "row"}
                  gap={2}
                >
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexGrow: 1,
                      borderRadius: "12px",
                      border: role === "student" ? 2 : 1,
                      borderColor:
                        role === "student" ? "primary.main" : "grey.400",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      height: "5rem",
                      ":hover": {
                        borderColor: "primary.main",
                        backgroundColor:
                          theme.palette.mode === "dark" ? grey[800] : grey[100],
                      },
                    }}
                    onClick={() => onRoleChange("user")}
                  >
                    <img src={StudentImg} height={48} />
                    <Typography>I am a student</Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      flexGrow: 1,
                      borderRadius: "12px",
                      border: role === "teacher" ? 2 : 1,
                      borderColor:
                        role === "teacher" ? "primary.main" : "grey.400",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      height: "5rem",
                      ":hover": {
                        borderColor: "primary.main",
                        backgroundColor:
                          theme.palette.mode === "dark" ? grey[800] : grey[100],
                      },
                    }}
                    onClick={() => onRoleChange("teacher")}
                  >
                    <img src={TeacherImg} height={48} />
                    <Typography>I am a teacher</Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              height: 48,
            }}
          >
            <Typography fontWeight={600}>Sign up</Typography>
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
          color={theme.palette.mode === "light" ? "#8B2CF5" : blue[500]}
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
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
          <Typography>Already have an account?</Typography>
          <Link
            color={theme.palette.mode === "light" ? "#8B2CF5" : blue[500]}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/signin")}
          >
            Sign in
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
          borderColor: "primary.main",
          height: 48,
        }}
      >
        <img src={GoogleLogo} width={24} height={24} />
        <Typography fontWeight={600} color="primary.main" marginLeft={0.5}>
          Sign in with Google
        </Typography>
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{
          borderColor: "primary.main",
          height: 48,
        }}
      >
        <img src={FacebookLogo} width={24} height={24} />
        <Typography fontWeight={600} color="primary.main" marginLeft={0.5}>
          Sign in with Facebook
        </Typography>
      </Button>
    </Stack>
  );
};

export default SignUpPage;
