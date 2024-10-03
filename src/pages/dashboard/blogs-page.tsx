import useMetaTitle from "@/hooks/use-meta-title";
import Box from "@mui/material/Box";

const BlogsPage = () => {
  useMetaTitle({ title: "Blogs" });

  return (
    <Box
      sx={{
        backgroundColor: "gray",
      }}
    >
      BlogsPage
    </Box>
  );
};

export default BlogsPage;
