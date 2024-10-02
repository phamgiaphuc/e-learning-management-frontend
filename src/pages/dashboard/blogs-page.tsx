import useMetaTitle from "@/hooks/use-meta-title";

const BlogsPage = () => {
  useMetaTitle({ title: "Blogs" });

  return <div>BlogsPage</div>;
};

export default BlogsPage;
