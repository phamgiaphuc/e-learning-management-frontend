import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";

const DasboardPage = () => {
  useMetaTitle({ title: "Dashboard" });

  return (
    <Box
      sx={{
        backgroundColor: "gray",
      }}
    >
      DasboardPage
    </Box>
  );
};

export default DasboardPage;
