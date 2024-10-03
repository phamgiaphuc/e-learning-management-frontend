import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";

const DasboardPage = () => {
  useMetaTitle({ title: "Dashboard" });

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: " blue",
        gap: 2,
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "gray",
          height: "100vh",
        }}
      >
        ABC
      </Box>
      <Box
        sx={{
          backgroundColor: "gray",
          height: "100vh",
        }}
      >
        ABC
      </Box>
    </Box>
  );
};

export default DasboardPage;
