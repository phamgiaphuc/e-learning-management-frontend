import { useAppSelector } from "@/hooks/use-app-selector";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { CircleHelp, Eye, EyeOff, Lock } from "lucide-react";
import {
  initialRecoverPasswordValues,
  RecoverPasswordProps,
  recoverPasswordSchema,
} from "@/types/auth/recover-password";
import { useFormik } from "formik";
import useAuthContext from "@/hooks/contexts/use-auth-context";

const AccountSettingSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { resetPassword } = useAuthContext();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const onPasswordVisibleChange = useCallback(
    () => setPasswordVisible(!passwordVisible),
    [passwordVisible],
  );

  const formik = useFormik<RecoverPasswordProps>({
    validationSchema: recoverPasswordSchema,
    initialValues: initialRecoverPasswordValues,
    onSubmit: async (values) => {
      resetPassword(values);
    },
  });

  return (
    <Stack flexDirection="column" gap={5}>
      <Stack flexDirection="column" gap={2} marginTop={2}>
        <Typography fontSize={25} fontWeight={600}>
          Account Settings
        </Typography>
        <Divider />
      </Stack>
      <Grid2 container rowSpacing={3}>
        <Grid2 size={{ lg: 12 }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Username
            </Typography>
            <TextField
              disabled
              autoFocus
              name="username"
              value={user?.username}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ lg: 12 }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontSize={18} fontWeight={500}>
              Email
            </Typography>
            <TextField disabled autoFocus name="email" value={user?.email} />
          </Box>
        </Grid2>
      </Grid2>
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" gap={2} marginTop={2}>
          <Typography fontSize={25} fontWeight={600}>
            Change password
          </Typography>
          <Divider />
        </Stack>
        <Grid2 container rowSpacing={3}>
          <Grid2 size={{ lg: 12 }}>
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
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  !!(formik.touched.newPassword && formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
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
                placeholder="Enter new password"
                type={passwordVisible ? "text" : "password"}
                fullWidth
              />
            </Box>
          </Grid2>
          <Grid2 size={{ lg: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  height: 48,
                }}
              >
                <Typography fontWeight={600}>Save Changes</Typography>
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Stack>
  );
};

export default AccountSettingSection;
