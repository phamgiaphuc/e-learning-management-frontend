import useMetaTitle from "@/hooks/use-meta-title";
import {
  initialRecoverPasswordValues,
  RecoverPasswordProps,
  recoverPasswordSchema,
} from "@/types/auth/recover-password";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Lock } from "lucide-react";

const RecoverPasswordPage = () => {
  const formik = useFormik<RecoverPasswordProps>({
    validationSchema: recoverPasswordSchema,
    initialValues: initialRecoverPasswordValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // Actions
  useMetaTitle({ title: "Recover password" });

  return (
    <form
      style={{
        width: "100%",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Stack gap={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography fontSize={18} fontWeight={500}>
            Enter your new password
          </Typography>
          <TextField
            name="password"
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
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.newPassword && formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Box>
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
            // value={formik.values.passwordConfirm}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={
            //   !!(
            //     formik.touched.passwordConfirm && formik.errors.passwordConfirm
            //   )
            // }
            // helperText={
            //   formik.touched.passwordConfirm && formik.errors.passwordConfirm
            // }
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
          <Typography fontWeight={600}>Reset Password</Typography>
        </Button>
      </Stack>
    </form>
  );
};

export default RecoverPasswordPage;
