import OtpInput from "@/components/inputs/otp-input";
import OtpInput2 from "@/components/inputs/otp-input-2";
import useAuthContext from "@/hooks/contexts/use-auth-context";
import useBreakpointContext from "@/hooks/use-breakpoint-context";
import useMetaTitle from "@/hooks/use-meta-title";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const OtpVerificationPage = () => {
  // Variables and states
  const [code, setCode] = useState<string>("");
  const { isMobileView } = useBreakpointContext();
  const [countdown, setCoundown] = useState<number | null>(30);
  const { verifyCode } = useAuthContext();
  const [params] = useSearchParams();

  const onClickSendAgain = useCallback(() => setCoundown(30), []);

  const onClickSubmit = useCallback(async () => {
    await verifyCode({
      id: params.get("id") || "",
      userId: params.get("userId") || "",
      code: code,
    });
  }, [code, params, verifyCode]);

  useMetaTitle({ title: "Verification" });

  useEffect(() => {
    if (countdown === 0) {
      setCoundown(null);
    }
    if (!countdown) return;
    const intervalId = setInterval(() => {
      setCoundown((countdown) => (countdown as number) - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <Stack gap={2} alignItems="center" marginX="auto" width="auto">
      <Box display="flex" flexDirection="column" gap={1} textAlign="center">
        <Typography fontSize={18} fontWeight={500}>
          Enter the OTP code sent to your mail
        </Typography>
        {isMobileView ? (
          <OtpInput2
            onChange={(res: string) => {
              setCode(res);
            }}
          />
        ) : (
          <OtpInput
            onChange={(res: string) => {
              setCode(res);
            }}
          />
        )}
      </Box>
      <Box
        display="flex"
        gap={0.5}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
      >
        <Typography fontSize={16} fontWeight={500}>
          Not recieve the OTP code?
        </Typography>
        {countdown ? (
          <Typography color="primary" fontSize={16} fontWeight={500}>
            {countdown}s
          </Typography>
        ) : (
          <Link
            underline="hover"
            sx={{
              cursor: "pointer",
            }}
            onClick={onClickSendAgain}
          >
            <Typography color="primary" fontSize={16} fontWeight={500}>
              Send again
            </Typography>
          </Link>
        )}
      </Box>
      <Button
        size="large"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          height: 48,
        }}
        fullWidth
        onClick={onClickSubmit}
      >
        <Typography fontWeight={600}> Verify & Proceed</Typography>
      </Button>
    </Stack>
  );
};

export default OtpVerificationPage;
