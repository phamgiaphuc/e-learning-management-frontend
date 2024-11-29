import NotFoundImage from "@/assets/images/404.png";
import FlexBox from "@/components/styles/flex-box";
import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
  useMetaTitle({ title: "Not found" });

  return (
    <FlexBox
      sx={{
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <img src={NotFoundImage} alt="404-image" height={64} />
        <Typography variant="h4" fontWeight={600}>
          404 - Page Not Found
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 600,
          textAlign: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unvaliable
        </Typography>
        <Button
          href="/"
          sx={{
            width: "fit-content",
          }}
          variant="contained"
        >
          <Typography fontWeight={600}>Go to home page</Typography>
        </Button>
      </Box>
    </FlexBox>
  );
};

export default NotFoundPage;
