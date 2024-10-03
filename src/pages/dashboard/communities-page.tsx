import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";

const CommunitiesPage = () => {
  useMetaTitle({ title: "Communities" });

  return (
    <Box
      sx={{
        backgroundColor: "gray",
      }}
    >
      CommunitiesPage
    </Box>
  );
};

export default CommunitiesPage;
