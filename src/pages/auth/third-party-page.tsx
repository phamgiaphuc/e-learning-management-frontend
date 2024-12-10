import useAuthContext from "@/hooks/contexts/use-auth-context";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ThirdPartyPage = () => {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { getMe } = useAuthContext();

  const status = useMemo(
    () => Boolean(params.get("success") || false),
    [params],
  );
  const accessToken = useMemo(() => params.get("at"), [params]);
  const refreshToken = useMemo(() => params.get("rt"), [params]);

  useEffect(() => {
    const getUserByToken = async () => {
      if (status) {
        await getMe(accessToken || "", refreshToken || "");
        setLoading(false);
      }
    };
    getUserByToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography>Logging in. Please wait a moment...</Typography>
        </Box>
      ) : (
        <Typography>Logged in successfully. Redirecting...</Typography>
      )}
    </div>
  );
};

export default ThirdPartyPage;
