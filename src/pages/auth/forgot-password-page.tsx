import useAuthContext from "@/hooks/contexts/use-auth-context";
import useMetaTitle from "@/hooks/use-meta-title";
import {
  ForgotPasswordProps,
  forgotPasswordSchema,
  initialForgotPasswordValues,
} from "@/types/auth/forgot-password";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { User } from "lucide-react";

const ForgotPasswordPage = () => {
  // Variables and states
  const { sendResetPasswordCode } = useAuthContext();

  const formik = useFormik<ForgotPasswordProps>({
    validationSchema: forgotPasswordSchema,
    initialValues: initialForgotPasswordValues,
    onSubmit: async (values) => {
      try {
        await sendResetPasswordCode(values);
        console.log("Reset password code sent successfully");
      } catch (error) {
        console.error("Failed to send reset password code:", error);
      }
    },
  });

  // Actions
  useMetaTitle({ title: "Forgot password" });

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
            Enter your email account to reset password
          </Typography>
          <TextField
            autoFocus
            name="email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} />
                  </InputAdornment>
                ),
              },
            }}
            type="email"
            placeholder="Enter your email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          <Typography fontWeight={600}>Continue</Typography>
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPasswordPage;
